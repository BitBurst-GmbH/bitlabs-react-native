import { WidgetType, type Survey } from './api/bitlabs_service/types';
import { NativeBitLabs } from './native_bitlabs';

/**
 * Determines whether the user has surveys available.
 *
 * @deprecated Use `BitLabsService.checkSurveys` instead.
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
) => {
  NativeBitLabs.configureAPI(token, uid);

  NativeBitLabs.checkSurveys()
    .then((hasSurveys: boolean) => onResponse(hasSurveys))
    .catch((error: Error) => onFailure(error));
};

/**
 * Fetches a list of surveys the user can open.
 *
 * @deprecated Use `BitLabsService.getSurveys` instead.
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
) => {
  NativeBitLabs.configureAPI(token, uid);

  NativeBitLabs.getSurveys()
    .then((surveys: Survey[]) => onResponse(surveys))
    .catch((error: Error) => onFailure(error));
};

export { BitLabsService } from './api/bitlabs_service';

export { WidgetType };

export { default as BitLabsOfferWall } from './components/offerwall';

export { default as BitLabsWidget } from './components/bitlabs-widget';
