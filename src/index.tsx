import { getSurveysRepo } from './api/bitlabs_service';
import { WidgetType, type Survey } from './api/bitlabs_service/types';

/**
 * Determines whether the user has surveys available.
 *
 * @param token Found in your [BitLabs Dashboard](https://dashboard.bitlabs.ai/).
 * @param uid Should belong to the current user so that you to keep track of which user got what.
 * @param onResponse The boolean parameter is `true` if user has surveys and `false` otherwise.
 * @param onFailure Triggered if there has been an internal error.
 */
export const checkSurveys = (
  token: string,
  uid: string,
  onResponse: (hasSurveys: boolean) => void,
  onFailure: (error: Error) => void
) =>
  getSurveysRepo(
    token,
    uid,
    (surveys) => onResponse(surveys.length > 0),
    onFailure
  );

/**
 * Fetches a list of surveys the user can open.
 *
 * @param token Found in your [BitLabs Dashboard](https://dashboard.bitlabs.ai/).
 * @param uid Should belong to the current user so that you to keep track of which user got what.
 * @param onResponse Triggered when a response is received. Its parameter is the list of surveys.
 * @param onFailure Triggered if there has been an internal error.
 */
export const getSurveys = (
  token: string,
  uid: string,
  onResponse: (surveys: Survey[]) => void,
  onFailure: (error: Error) => void
) => getSurveysRepo(token, uid, (surveys) => onResponse(surveys), onFailure);

/** @deprecated Use `WidgetType` instead. */
export const SurveyType = WidgetType;

export { WidgetType };

export { default as BitLabsOfferWall } from './components/offerwall';

export { default as BitLabsWidget } from './components/bitlabs-widget';
