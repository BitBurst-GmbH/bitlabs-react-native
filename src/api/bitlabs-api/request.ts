import { Dimensions, Platform } from 'react-native';

const bitlabsRequest = (
  path: string,
  token: string,
  uid: string,
  options?: {
    queries?: { [key: string]: string };
    body?: string;
  },
) => {
  let url = `https://api.bitlabs.ai/${path}?platform=MOBILE`;

  const queries = new URLSearchParams(options?.queries).toString();
  if (queries) {
    url = url.concat(`&${queries}`);
  }

  const body = options?.body;
  const method = body ? 'POST' : 'GET';
  const headers = {
    'X-Api-Token': token,
    'X-User-Id': uid,
    'User-Agent': getUserAgent(),
    ...(body && {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }),
  };

  return new Request(url, {
    method: method,
    headers: headers,
    body: body,
  });
};

const getUserAgent = () => {
  const version = require('../../../package.json').version;
  const { width } = Dimensions.get('window');
  const deviceType = width < 768 ? 'phone' : 'tablet';

  return `BitLabs/${version} (${Platform.OS} ${Platform.Version}; ${deviceType})`;
};

export const updateClickApi = (
  token: string,
  uid: string,
  clickId: string,
  reason: string,
) =>
  fetch(
    bitlabsRequest(`v2/client/clicks/${clickId}`, token, uid, {
      body: JSON.stringify({ leave_survey: { reason: reason } }),
    }),
  );

export const getAppSettingsApi = (url: string) => fetch(new Request(url));
