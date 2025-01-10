import { Dimensions, Platform } from 'react-native';

const bitlabsRequest = (
  path: string,
  token: string,
  uid: string,
  options?: {
    queries?: { [key: string]: string };
    body?: string;
  }
) => {
  let url = `https://api.bitlabs.ai/${path}?platform=MOBILE`;
  let method = 'GET';
  let body;
  let headers: { [key: string]: string } = {
    'X-Api-Token': token,
    'X-User-Id': uid,
    'User-Agent': getUserAgent(),
  };

  if (options) {
    const queries = options.queries;
    if (queries) {
      Object.keys(queries).forEach(
        (key) => (url = url.concat(`&${key}=${queries[key]}`))
      );
    }

    body = options.body;
    if (body) {
      method = 'POST';
      headers = {
        ...headers,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      };
    }
  }

  const request = new Request(url, {
    method: method,
    headers: headers,
    body: body,
  });

  console.log(request);

  return request;
};

const getUserAgent = () => {
  const version = require('../../../package.json').version;
  const { width } = Dimensions.get('window');
  const deviceType = width < 768 ? 'phone' : 'tablet';

  return `BitLabs/${version} (${Platform.OS} ${Platform.Version}; ${deviceType})`;
};

export const getSurveysApi = (token: string, uid: string) =>
  fetch(
    bitlabsRequest('v2/client/surveys', token, uid, {
      queries: { os: Platform.OS, sdk: 'REACT' },
    })
  );

export const updateClickApi = (
  token: string,
  uid: string,
  clickId: string,
  reason: string
) =>
  fetch(
    bitlabsRequest(`v2/client/clicks/${clickId}`, token, uid, {
      body: JSON.stringify({ leave_survey: { reason: reason } }),
    })
  );

export const getAppSettingsApi = (token: string, uid: string) =>
  fetch(bitlabsRequest('v1/client/settings/v2', token, uid));

export const getLeaderboardApi = (token: string, uid: string) =>
  fetch(bitlabsRequest('v1/client/leaderboard', token, uid));

export const getCurrencyIconApi = (url: string) => fetch(new Request(url));
