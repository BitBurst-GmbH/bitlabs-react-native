import React from 'react';
import * as api from '../api/bitlabs/bitlabs_api';
import { act, render, screen, waitFor } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import OfferWall from '../components/offerwall';
import { Platform } from 'react-native';
import { HookName, type HookMessage } from '../api/bitlabs/types';

const mockProps = {
  token: 'token',
  uid: 'uid',
  adId: '',
  tags: {},
  onExitPressed: jest.fn(),
  onReward: jest.fn(),
};

beforeAll(() => {
  jest.spyOn(api, 'getAppSettingsApi').mockResolvedValue(
    Promise.resolve({
      json: () =>
        Promise.resolve({
          data: {
            visual: {
              navigation_color: 'navigation_color',
              survey_icon_color: 'survey_icon_color',
            },
            currency: {
              factor: 1,
              symbol: {
                content: '$',
                is_image: false,
              },
              bonus_percentage: 10,
            },
          },
          status: 'success',
          trace_id: '',
        }),
    } as Response)
  );
});

afterAll(() => {
  jest.restoreAllMocks();
});

test('should render the WebView with the correct URL and parameters', async () => {
  render(<OfferWall {...mockProps} />);

  await waitFor(() => expect(screen.getByTestId('Webview')).toBeOnTheScreen());

  const expectedUrl = `https://web.bitlabs.ai?token=${mockProps.token}&uid=${mockProps.uid}&os=${Platform.OS}&sdk=REACT`;

  expect(screen.getByTestId('Webview').props.source.uri).toBe(expectedUrl);
});

test('should include adId in the WebView URL when provided', async () => {
  render(<OfferWall {...mockProps} adId="adId" />);

  await waitFor(() => expect(screen.getByTestId('Webview')).toBeOnTheScreen());

  const expectedUrl = `https://web.bitlabs.ai?token=${mockProps.token}&uid=${mockProps.uid}&os=${Platform.OS}&sdk=REACT&maid=adId`;

  expect(screen.getByTestId('Webview').props.source.uri).toBe(expectedUrl);
});

// test('should update the WebView URL when adId prop is changed', async () => {
//   const { rerender } = render(<OfferWall {...mockProps} adId="adId" />);

//   await waitFor(() => expect(screen.getByTestId('Webview')).toBeOnTheScreen());

//   let expectedUrl = `https://web.bitlabs.ai?token=${mockProps.token}&uid=${mockProps.uid}&os=${Platform.OS}&sdk=REACT&maid=adId`;

//   expect(screen.getByTestId('Webview').props.source.uri).toBe(expectedUrl);

//   rerender(<OfferWall {...mockProps} adId="newAdId" />);

//   await waitFor(() => expect(screen.getByTestId('Webview')).toBeOnTheScreen());

//   expectedUrl = `https://web.bitlabs.ai?token=${mockProps.token}&uid=${mockProps.uid}&os=${Platform.OS}&sdk=REACT&maid=newAdId`;

//   expect(screen.getByTestId('Webview').props.source.uri).toBe(expectedUrl);
// });

test('should handle rapid successive updates of adId prop without errors', () => {
  const { rerender } = render(<OfferWall {...mockProps} adId="firstId" />);
  rerender(<OfferWall {...mockProps} adId="secondId" />);
  rerender(<OfferWall {...mockProps} adId="finalId" />);
  const webView = screen.getByTestId('Webview');
  expect(webView.props.source.uri).toContain('maid=finalId');
});

test('should omit the SDK indicator in the URL when onExitPressed is not provided', async () => {
  render(<OfferWall {...mockProps} onExitPressed={undefined} />);

  await waitFor(() => expect(screen.getByTestId('Webview')).toBeOnTheScreen());

  const expectedUrl = `https://web.bitlabs.ai?token=${mockProps.token}&uid=${mockProps.uid}&os=${Platform.OS}`;

  expect(screen.getByTestId('Webview').props.source.uri).toBe(expectedUrl);
});

test('should call onExitPressed when onMessage receives a close event', () => {
  render(<OfferWall {...mockProps} />);
  const webView = screen.getByTestId('Webview');

  const hookMessage: HookMessage = {
    type: 'hook',
    name: HookName.SdkClose,
    args: [],
  };

  act(() => {
    webView.props.onMessage({
      nativeEvent: { data: JSON.stringify(hookMessage) },
    });
  });

  // Assertions to check if the expected behavior occurred
  expect(mockProps.onExitPressed).toHaveBeenCalled();
  // Add other assertions based on expected changes in state or props
});

test('should call onReward with the correct reward value when onMessage receives a Screenout event', () => {
  let { unmount } = render(<OfferWall {...mockProps} />);
  const webView = screen.getByTestId('Webview');

  const screenoutEvent: HookMessage = {
    type: 'hook',
    name: HookName.SurveyScreenout,
    args: [{ reward: 10 }],
  };

  act(() => {
    webView.props.onMessage({
      nativeEvent: { data: JSON.stringify(screenoutEvent) },
    });
  });

  unmount();
  expect(mockProps.onReward).toHaveBeenCalledWith(10);
});

test('should call onReward with the correct reward value when onMessage receives a SurveyComplete event', () => {
  let { unmount } = render(<OfferWall {...mockProps} />);
  const webView = screen.getByTestId('Webview');

  const completeEvent: HookMessage = {
    type: 'hook',
    name: HookName.SurveyComplete,
    args: [{ reward: 10 }],
  };

  act(() => {
    webView.props.onMessage({
      nativeEvent: { data: JSON.stringify(completeEvent) },
    });
  });

  unmount();
  expect(mockProps.onReward).toHaveBeenCalledWith(10);
});

test('should call onReward with the correct reward value when onMessage receives a SurveyStartBonus event', () => {
  let { unmount } = render(<OfferWall {...mockProps} />);
  const webView = screen.getByTestId('Webview');

  const startEvent: HookMessage = {
    type: 'hook',
    name: HookName.SurveyStartBonus,
    args: [{ reward: 10 }],
  };

  act(() => {
    webView.props.onMessage({
      nativeEvent: { data: JSON.stringify(startEvent) },
    });
  });

  unmount();
  expect(mockProps.onReward).toHaveBeenCalledWith(10);
});

test('should call onReward with correct total reward when onMessage receives multiple reward events', () => {
  let { unmount } = render(<OfferWall {...mockProps} />);
  const webView = screen.getByTestId('Webview');

  const startEvent: HookMessage = {
    type: 'hook',
    name: HookName.SurveyStartBonus,
    args: [{ reward: 10 }],
  };

  const completeEvent: HookMessage = {
    type: 'hook',
    name: HookName.SurveyComplete,
    args: [{ reward: 20 }],
  };

  const screenoutEvent: HookMessage = {
    type: 'hook',
    name: HookName.SurveyScreenout,
    args: [{ reward: 30 }],
  };

  act(() => {
    webView.props.onMessage({
      nativeEvent: { data: JSON.stringify(startEvent) },
    });
  });

  act(() => {
    webView.props.onMessage({
      nativeEvent: { data: JSON.stringify(completeEvent) },
    });
  });

  act(() => {
    webView.props.onMessage({
      nativeEvent: { data: JSON.stringify(screenoutEvent) },
    });
  });

  unmount();
  expect(mockProps.onReward).toHaveBeenCalledWith(60);
});
