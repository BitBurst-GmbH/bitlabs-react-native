import { checkSurveysRepo, getSurveysRepo } from "./api/bitlabs_repository";
import type { Survey } from "./api/bitlabs_repository.types";
import { WidgetType } from "./api/widget-type";
import Leaderboard from "./components/leaderboard";
import OfferWall from "./components/offerwall";
import SurveyList from "./components/survey-list";

/**
 * Determines whether the user can perform an action in the OfferWall
 * (either opening a survey or answering qualifications) and then executes [onResponse].
 *
 * If you want to perform background checks if surveys are available, this is the best option.
 *
 * @param token Found in your [BitLabs Dashboard](https://dashboard.bitlabs.ai/).
 * @param uid Should belong to the current user so that you to keep track of which user got what.
 * @param onResponse The boolean parameter is `true` if an action can be performed and `false` otherwise.
 * @param onFailure Triggered if there has been an internal error.
 */
export const checkSurveys = (token: string, uid: string, onResponse: (hasSurveys: boolean) => void, onFailure: (error: Error) => void) =>
    checkSurveysRepo(token, uid, onResponse, onFailure);

/**
 * Fetches a list of surveys the user can open.
 * 
 * @param token Found in your [BitLabs Dashboard](https://dashboard.bitlabs.ai/).
 * @param uid Should belong to the current user so that you to keep track of which user got what.
 * @param onResponse Triggered when a response is received. Its parameter is the list of surveys.
 * @param onFailure Triggered if there has been an internal error.
 */
export const getSurveys = (token: string, uid: string, onResponse: (surveys: Survey[]) => void, onFailure: (error: Error) => void) =>
    getSurveysRepo(token, uid, onResponse, onFailure);

export const BitLabsOfferWall = OfferWall;

export const SurveyType = WidgetType;

export const BitLabsSurveys = SurveyList;

export const BitLabsLeaderboard = Leaderboard;