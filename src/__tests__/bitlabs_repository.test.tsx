import * as api from '../api/bitlabs_api';
import {
  getAppSettings,
  getLeaderboard,
  getSurveysRepo,
} from '../api/bitlabs_repository';

const mockErrorResponse = {
  error: {
    details: {
      http: '404',
      msg: 'Not Found',
    },
  },
  status: 'error',
  trace_id: '',
};

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
    const mockResponse = {
      data: {
        surveys: [
          {
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
          },
        ],
      },
      status: 'success',
      trace_id: '',
    };

    jest.spyOn(api, 'getSurveysApi').mockResolvedValue(
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      } as Response)
    );
    await getSurveysRepo(
      '',
      '',
      (surveys) => expect(surveys).toEqual(mockResponse.data.surveys),
      (_) => {
        throw new Error('onFailure should not be called');
      }
    );
  });

  test('fails given API call returns error response with 404', async () => {
    jest.spyOn(api, 'getSurveysApi').mockResolvedValue(
      Promise.resolve({
        json: () => Promise.resolve(mockErrorResponse),
      } as Response)
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
  test('fails given API call returns an error', async () => {
    jest
      .spyOn(api, 'getAppSettingsApi')
      .mockImplementation(() => Promise.reject('Error'));

    await getAppSettings('', '', (_) => {
      throw new Error('onResponse should not be called');
    }).catch((error) => expect(error).toBe('Error'));
  });

  test('succeeds given API call returns settings data', async () => {
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
    await getAppSettings(
      '',
      '',
      (
        surveyIconColor,
        navigationColor,
        currencyFactor,
        bonusPercentage,
        currencySymbol
      ) => {
        expect(surveyIconColor).toEqual('survey_icon_color');
        expect(navigationColor).toEqual('navigation_color');
        expect(currencyFactor).toEqual(1);
        expect(bonusPercentage).toEqual(0.1);
        expect(currencySymbol).toEqual([false, '$']);
      }
    ).catch((error) => {
      throw new Error(error);
    });
  });

  test('fails given API call returns error response with 404', async () => {
    jest.spyOn(api, 'getAppSettingsApi').mockResolvedValue(
      Promise.resolve({
        json: () => Promise.resolve(mockErrorResponse),
      } as Response)
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
    const mockResponse = {
      data: {
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
      },
      status: 'success',
      trace_id: '',
    };

    jest.spyOn(api, 'getLeaderboardApi').mockResolvedValue(
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      } as Response)
    );
    await getLeaderboard('', '', (leaderboard) => {
      expect(leaderboard.top_users).toEqual(mockResponse.data.top_users);
      expect(leaderboard.own_user).toEqual(mockResponse.data.own_user);
    }).catch((error) => {
      throw new Error(error);
    });
  });

  test('fails given API call returns error response with 404', async () => {
    jest.spyOn(api, 'getLeaderboardApi').mockResolvedValue(
      Promise.resolve({
        json: () => Promise.resolve(mockErrorResponse),
      } as Response)
    );

    await getLeaderboard('', '', (_) => {
      throw new Error('onResponse should not be called');
    }).catch((error) => expect(error.message).toContain('404 - Not Found'));
  });
});
