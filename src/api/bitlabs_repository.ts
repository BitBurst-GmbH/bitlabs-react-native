import { getRandomSurveys } from "../utils/helpers";
import { checkSurveysApi, getActionsApi, getAppSettingsApi, getOffersApi, leaveSurveysApi } from "./bitlabs_api";
import type { BitLabsResponse, CheckSurveyResponse, GetActionsResponse, GetAppSettingsResponse, GetOffersResponse, Survey } from "./bitlabs_repository.types";

export const checkSurveysRepo = async (token: string, uid: string, onResponse: (hasSurveys: boolean) => void, onFailure: (error: Error) => void) => {
    const response = await checkSurveysApi(token, uid);
    const body = await (response.json() as Promise<BitLabsResponse<CheckSurveyResponse>>);

    if (body.error) {
        onFailure(new Error(`${body.error.details.http} - ${body.error.details.msg}`));
        return;
    }

    onResponse(body.data.has_surveys);
}

export const getSurveysRepo = async (token: string, uid: string, onResponse: (surveys: Survey[]) => void, onFailure: (error: Error) => void) => {
    const response = await getActionsApi(token, uid);
    const body = await (response.json() as Promise<BitLabsResponse<GetActionsResponse>>);

    if (body.error) {
        onFailure(new Error(`${body.error.details.http} - ${body.error.details.msg}`));
        return;
    }

    onResponse(body.data.surveys.length > 0 ? body.data.surveys : getRandomSurveys());
}

export const leaveSurveysRepo = async (token: string, uid: string, networkId: string, surveyId: string, reason: string) => {
    const response = await leaveSurveysApi(token, uid, networkId, surveyId, reason);
    const body = await (response.json() as Promise<BitLabsResponse<void>>);

    if (body.error) {
        console.error(`${body.error.details.http} - ${body.error.details.msg}`);
        return;
    }

    console.log('[BitLabs] LeaveSurvey Successful');
}

export const getHasOffersRepo = async (token: string, uid: string) => {
    const response = await getOffersApi(token, uid);
    const body = await (response.json() as Promise<BitLabsResponse<GetOffersResponse>>);

    if (body.error) {
        console.error(`${body.error.details.http} - ${body.error.details.msg}`);
        return false;
    }

    return body.data.offers.length > 0;
}

export const getColorRepo = async (token: string, uid: string, onResponse: (surveyIconColor: string, navigationColor: string) => void) => {
    const response = await getAppSettingsApi(token, uid);
    const body = await (response.json() as Promise<BitLabsResponse<GetAppSettingsResponse>>);

    if (body.error) {
        console.error(`${body.error.details.http} - ${body.error.details.msg}`);
        return;
    }

    onResponse(body.data.visual.survey_icon_color, body.data.visual.navigation_color);
}
