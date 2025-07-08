import { NativeBitLabs } from '../../native_bitlabs';
import sentry from '../sentry_service';
import { getAppSettingsApi, updateClickApi } from './bitlabs_api';
import type { BitLabsResponse, GetAppSettingsResponse } from './types';

export const leaveSurveys = (
  token: string,
  uid: string,
  clickId: string,
  reason: string
) =>
  updateClickApi(token, uid, clickId, reason)
    .then((response) => response.json() as Promise<BitLabsResponse<void>>)
    .then((body) => {
      if (body.error) {
        const error = new Error(
          `UpdateClick Failed: ${body.error.details.http} - ${body.error.details.msg}`
        );

        sentry.captureError(token, uid, error);
        throw error;
      }

      return Promise.resolve('[BitLabs] LeaveSurvey Successful');
    });

export const getAppSettings = (
  token: string,
  onResponse: (settings: GetAppSettingsResponse) => void
) =>
  getAppSettingsApi(`https://dashboard.bitlabs.ai/api/public/v1/apps/${token}`)
    .then((response) => response.json() as Promise<GetAppSettingsResponse>)
    .then((body) => onResponse(body));

const init = (token: string, uid: string) => {
  NativeBitLabs.configureAPI(token, uid);
};

const getSurveys = NativeBitLabs.getSurveys;

const checkSurveys = NativeBitLabs.checkSurveys;

export const BitLabsService = {
  init,
  getSurveys,
  checkSurveys,
};
