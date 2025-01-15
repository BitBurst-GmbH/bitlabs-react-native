import sentry from '../sentry_service';
import {
  getAppSettingsApi,
  getLeaderboardApi,
  getSurveysApi,
  updateClickApi,
} from './bitlabs_api';
import type {
  BitLabsResponse,
  GetAppSettingsResponse,
  GetLeaderboardResponse,
  GetSurveysResponse,
  RestrictionReason,
  Survey,
} from './types';

export const getSurveysRepo = (
  token: string,
  uid: string,
  onResponse: (surveys: Survey[]) => void,
  onFailure: (error: Error) => void
) =>
  getSurveysApi(token, uid)
    .then(
      (response) =>
        response.json() as Promise<BitLabsResponse<GetSurveysResponse>>
    )
    .then((body) => {
      const prettyPrintRestriction = (restriction: RestrictionReason) => {
        if (restriction.not_verified) {
          return 'The publisher account that owns this app has not been verified and therefore cannot receive surveys.';
        }
        if (restriction.using_vpn) {
          return 'The user is using a VPN and cannot access surveys.';
        }
        if (restriction.banned_until) {
          return 'The user is banned until $bannedUntil';
        }
        if (restriction.unsupported_country) {
          return 'Unsupported Country: $unsupportedCountry';
        }

        return restriction.reason ?? 'Unknown Reason';
      };

      const restriction = body.data?.restriction_reason;
      if (restriction) {
        const error = new Error(
          'GetSurveys Restricted: ' + prettyPrintRestriction(restriction)
        );

        sentry.captureError(token, uid, error);
        throw error;
      }

      if (body.error) {
        const error = new Error(
          `GetSurveys Failed: ${body.error.details.http} - ${body.error.details.msg}`
        );

        sentry.captureError(token, uid, error);
        throw error;
      }

      onResponse(body.data!.surveys);
    })
    .catch((error) => onFailure(error));

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
  uid: string,
  onResponse: (
    surveyIconColor: string,
    navigationColor: string,
    currencyFactor: number,
    bonusPercentage: number,
    currencySymbol: [boolean, string]
  ) => void
) =>
  getAppSettingsApi(token, uid)
    .then(
      (response) =>
        response.json() as Promise<BitLabsResponse<GetAppSettingsResponse>>
    )
    .then((body) => {
      if (body.error) {
        const error = new Error(
          `GetAppSettings Failed: ${body.error.details.http} - ${body.error.details.msg}`
        );

        sentry.captureError(token, uid, error);
        throw error;
      }

      const settings = body.data!;

      let totalBonusPercentage = settings.currency.bonus_percentage / 100;
      if (settings.promotion) {
        totalBonusPercentage +=
          settings.promotion.bonus_percentage / 100 +
          (totalBonusPercentage * settings.promotion.bonus_percentage) / 100;
      }

      const currencySymbol: [boolean, string] = [
        settings.currency.symbol.is_image,
        settings.currency.symbol.content,
      ];

      onResponse(
        settings.visual.survey_icon_color,
        settings.visual.navigation_color,
        +settings.currency.factor,
        totalBonusPercentage,
        currencySymbol
      );
    });

export const getLeaderboard = (
  token: string,
  uid: string,
  onResponse: (leaderboard: GetLeaderboardResponse) => void
) =>
  getLeaderboardApi(token, uid)
    .then(
      (response) =>
        response.json() as Promise<BitLabsResponse<GetLeaderboardResponse>>
    )
    .then((body) => {
      if (body.error) {
        const error = new Error(
          `GetLeaderboard Failed: ${body.error.details.http} - ${body.error.details.msg}`
        );

        sentry.captureError(token, uid, error);
        throw error;
      }

      onResponse(body.data!);
    });

export const getIsImageSVG = (
  url: string,
  onResponse: (isSVG: boolean) => void
) =>
  fetch(new Request(url)).then((response) =>
    onResponse(response.headers.get('content-type') === 'image/svg+xml')
  );
