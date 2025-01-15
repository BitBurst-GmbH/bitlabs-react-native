import * as api from '../api/bitlabs_service/bitlabs_api';
import {
  getAppSettings,
  getLeaderboard,
  getSurveysRepo,
} from '../api/bitlabs_service';

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

describe('getSurveys', () => {
  test('fails given API call returns an error', async () => {
    jest
      .spyOn(api, 'getSurveysApi')
      .mockImplementation(() => Promise.reject('Error'));

    await getSurveysRepo(
      '',
      '',
      (_) => {
        throw new Error('onResponse should not be called');
      },
      (error) => expect(error).toBe('Error')
    );
  });

  test('succeeds given API call returns survey data', async () => {
    const mockSurvey = {
      id: '1',
      title: 'title',
      description: 'description',
      cover_image_url: 'cover_image_url',
      thank_you_message: 'thank_you_message',
      is_active: true,
      questions: [
        {
          id: '1',
          title: 'title',
          description: 'description',
          question_type: 'question_type',
          required: true,
          options: [
            {
              id: '1',
              title: 'title',
              description: 'description',
              image_url: 'image_url',
            },
          ],
        },
      ],
    };

    jest
      .spyOn(api, 'getSurveysApi')
      .mockResolvedValue(
        Promise.resolve(
          createMockResponse({ surveys: [mockSurvey] }) as Response
        )
      );

    await getSurveysRepo(
      '',
      '',
      (surveys) => expect(surveys).toEqual([mockSurvey]),
      (_) => {
        throw new Error('onFailure should not be called');
      }
    );
  });

  test('fails given API call returns error response with 404', async () => {
    jest
      .spyOn(api, 'getSurveysApi')
      .mockResolvedValue(
        Promise.resolve(createMockErrorResponse('404', 'Not Found') as Response)
      );

    await getSurveysRepo(
      '',
      '',
      (_) => {
        throw new Error('onResponse should not be called');
      },
      (error) => expect(error.message).toContain('404 - Not Found')
    );
  });
});

describe('getAppSettings', () => {
  test('fails when API call returns an error', async () => {
    jest
      .spyOn(api, 'getAppSettingsApi')
      .mockImplementation(() => Promise.reject('Error'));

    await getAppSettings('', '', (_) => {
      throw new Error('onResponse should not be called');
    }).catch((error: string) => expect(error).toBe('Error'));
  });

  test('succeeds given API call returns settings data', async () => {
    const mockSettings = {
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
    };

    jest
      .spyOn(api, 'getAppSettingsApi')
      .mockResolvedValue(
        Promise.resolve(createMockResponse(mockSettings) as Response)
      );

    await getAppSettings(
      '',
      '',
      (
        surveyIconColor: string,
        navigationColor: string,
        currencyFactor: number,
        bonusPercentage: number,
        currencySymbol: [boolean, string]
      ) => {
        expect(surveyIconColor).toEqual('survey_icon_color');
        expect(navigationColor).toEqual('navigation_color');
        expect(currencyFactor).toEqual(1);
        expect(bonusPercentage).toEqual(0.1); // Divided by 100
        expect(currencySymbol).toEqual([false, '$']);
      }
    ).catch((error) => {
      throw new Error(error.message);
    });
  });

  test('fails when API call returns 404 error response', async () => {
    jest
      .spyOn(api, 'getAppSettingsApi')
      .mockResolvedValue(
        Promise.resolve(createMockErrorResponse('404', 'Not Found') as Response)
      );

    await getAppSettings('', '', (_) => {
      throw new Error('onResponse should not be called');
    }).catch((error) => expect(error.message).toContain('404 - Not Found'));
  });
});

describe('getLeaderboard', () => {
  test('fails given API call returns an error', async () => {
    jest
      .spyOn(api, 'getLeaderboardApi')
      .mockImplementation(() => Promise.reject('Error'));

    await getLeaderboard('', '', (_) => {
      throw new Error('onResponse should not be called');
    }).catch((error) => expect(error).toBe('Error'));
  });

  test('succeeds given API call returns leaderboard data', async () => {
    const mockLeaderboard = {
      top_users: [
        {
          rank: 1,
          name: 'name',
          points: 1,
        },
      ],
      own_user: {
        rank: 1,
        name: 'name',
        points: 1,
      },
    };

    jest
      .spyOn(api, 'getLeaderboardApi')
      .mockResolvedValue(
        Promise.resolve(createMockResponse(mockLeaderboard) as Response)
      );

    await getLeaderboard('', '', (leaderboard) => {
      expect(leaderboard.top_users).toEqual(mockLeaderboard.top_users);
      expect(leaderboard.own_user).toEqual(mockLeaderboard.own_user);
    }).catch((error) => {
      throw new Error(error);
    });
  });

  test('fails when API call returns 404 error response', async () => {
    jest
      .spyOn(api, 'getLeaderboardApi')
      .mockResolvedValue(
        Promise.resolve(createMockErrorResponse('404', 'Not Found') as Response)
      );

    await getLeaderboard('', '', (_) => {
      throw new Error('onResponse should not be called');
    }).catch((error) => expect(error.message).toContain('404 - Not Found'));
  });
});
