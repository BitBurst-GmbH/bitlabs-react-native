import React from 'react';
import * as api from '../api/bitlabs_api';
import { render, screen, waitFor } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import OfferWall from '../components/offerwall';
import { Platform } from 'react-native';

const mockProps = {
  token: 'token',
  uid: 'uid',
  adId: '',
  onExitPressed: jest.fn(),
  onReward: jest.fn(),
};

beforeAll(() => {
  const mockResponse = {
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
  };

  jest.spyOn(api, 'getAppSettingsApi').mockResolvedValue(
    Promise.resolve({
      json: () => Promise.resolve(mockResponse),
    } as Response)
  );
});

test('renders correctly with correct Offerwall URL and Parameters', async () => {
  render(<OfferWall {...mockProps} />);

  await waitFor(() => expect(screen.getByTestId('Webview')).toBeOnTheScreen());

  const expectedUrl = `https://web.bitlabs.ai?token=${mockProps.token}&uid=${mockProps.uid}&sdk=REACT&os=${Platform.OS}`;

  expect(screen.getByTestId('Webview').props.source.uri).toBe(expectedUrl);
});

test('renders correctly with adId in URL', async () => {
  render(<OfferWall {...mockProps} adId="adId" />);

  await waitFor(() => expect(screen.getByTestId('Webview')).toBeOnTheScreen());

  const expectedUrl = `https://web.bitlabs.ai?token=${mockProps.token}&uid=${mockProps.uid}&sdk=REACT&os=${Platform.OS}&maid=adId`;

  expect(screen.getByTestId('Webview').props.source.uri).toBe(expectedUrl);
});
