import * as api from '../api/bitlabs-service/bitlabs-api';
import { getAppSettings } from '../api/bitlabs-service';

const createMockResponse = (data: any) => ({
  json: () => Promise.resolve({ data, status: 'success', trace_id: '' }),
});

const createMockErrorResponse = (httpStatus: string, msg: string) => ({
  json: () =>
    Promise.resolve({
      error: { details: { http: httpStatus, msg } },
      status: 'error',
      trace_id: '',
    }),
});

// Setup and Teardown Hooks
beforeEach(() => {
  // Reset mocks before each test
  jest.resetAllMocks();
});

afterEach(() => {
  // Additional cleanup after each test if necessary
  jest.clearAllMocks();
});

describe('getAppSettings', () => {
  test('fails when API call returns an error', async () => {
    jest
      .spyOn(api, 'getAppSettingsApi')
      .mockImplementation(() => Promise.reject('Error'));

    await getAppSettings('', (_) => {
      throw new Error('onResponse should not be called');
    }).catch((error: string) => expect(error).toBe('Error'));
  });

  test('succeeds given API call returns settings data', async () => {
    const mockSettings = {
      configuration: [
        {
          internalIdentifier: 'app.visual.light.survey_icon_color',
          value: 'survey_icon_color',
        },
        {
          internalIdentifier: 'app.visual.light.navigation_color',
          value: 'navigation_color',
        },
        { internalIdentifier: 'general.currency.factor', value: '1' },
      ],
    };

    jest
      .spyOn(api, 'getAppSettingsApi')
      .mockResolvedValue(
        Promise.resolve(createMockResponse(mockSettings) as Response)
      );

    await getAppSettings('', (settings) => {
      let surveyIconColor = settings.configuration.find(
        (c) => c.internalIdentifier === 'app.visual.light.survey_icon_color'
      )?.value;
      expect(surveyIconColor).toEqual('survey_icon_color');

      let navigationColor = settings.configuration.find(
        (c) => c.internalIdentifier === 'app.visual.light.navigation_color'
      )?.value;
      expect(navigationColor).toEqual('navigation_color');

      let currencyFactor = parseFloat(
        settings.configuration.find(
          (c) => c.internalIdentifier === 'general.currency.factor'
        )?.value ?? '1'
      );
      expect(currencyFactor).toEqual(1);
    }).catch((error) => {
      throw new Error(error.message);
    });
  });

  test('fails when API call returns 404 error response', async () => {
    jest
      .spyOn(api, 'getAppSettingsApi')
      .mockResolvedValue(
        Promise.resolve(createMockErrorResponse('404', 'Not Found') as Response)
      );

    await getAppSettings('', (_) => {
      throw new Error('onResponse should not be called');
    }).catch((error) => expect(error.message).toContain('404 - Not Found'));
  });
});
