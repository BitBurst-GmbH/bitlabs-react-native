import { getRandomSurveys } from "../utils/helpers";
import BitLabsApi, { getOffersApi, leaveSurveysApi } from "./bitlabs_api";
import type { BitLabsResponse, CheckSurveyResponse, GetActionsResponse, GetOffersResponse, Survey } from "./bitlabs_repository.types";


const init = (token: string, uid: string) => BitLabsApi.init(token, uid);

const checkSurveys = async (onResponse: (hasSurveys: boolean) => void) => {
    const response = await BitLabsApi.checkSurveys();
    const body = await (response.json() as Promise<BitLabsResponse<CheckSurveyResponse>>);

    if (body.error) {
        console.log(`${body.error.details.http} - ${body.error.details.msg}`);
        return;
    }

    onResponse(body.data.has_surveys);
}

const getSurveys = async (onResponse: (surveys: Survey[]) => void) => {
    const response = await BitLabsApi.getActions();
    const body = await (response.json() as Promise<BitLabsResponse<GetActionsResponse>>);

    if (body.error) {
        console.log(`${body.error.details.http} - ${body.error.details.msg}`);
        return;
    }

    onResponse(body.data.surveys.length > 0 ? body.data.surveys : getRandomSurveys());
}

export const leaveSurveys = async (token: string, uid: string, networkId: string, surveyId: string, reason: string) => {
    const response = await leaveSurveysApi(token, uid, networkId, surveyId, reason);
    const body = await (response.json() as Promise<BitLabsResponse<void>>);

    if (body.error) {
        console.log(`${body.error.details.http} - ${body.error.details.msg}`);
        return;
    }

    console.log('[BitLabs] LeaveSurvey Successful');
}

export const getHasOffers = async (token: string, uid: string) => {
    const response = await getOffersApi(token, uid);
    const body = await (response.json() as Promise<BitLabsResponse<GetOffersResponse>>);

    if (body.error) {
        console.log(`${body.error.details.http} - ${body.error.details.msg}`);
        return false;
    }

    return body.data.offers.length > 0;
}

export default {
    init: init,
    getSurveys: getSurveys,
    checkSurveys: checkSurveys,
}
