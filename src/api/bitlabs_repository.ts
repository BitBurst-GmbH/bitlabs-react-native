import { getSurveysApi, getAppSettingsApi, getLeaderboardApi, getOffersApi, updateClickApi } from "./bitlabs_api";
import type { BitLabsResponse, GetSurveysResponse, GetAppSettingsResponse, GetLeaderboardResponse, GetOffersResponse, Survey } from "./bitlabs_repository.types";

export const getSurveysRepo = async (token: string, uid: string, onResponse: (surveys: Survey[]) => void, onFailure: (error: Error) => void) => {
    const response = await getSurveysApi(token, uid);
    const body = await (response.json() as Promise<BitLabsResponse<GetSurveysResponse>>);

    if (body.error) {
        onFailure(new Error(`${body.error.details.http} - ${body.error.details.msg}`));
        return;
    }

    onResponse(body.data.surveys);
}

export const leaveSurveysRepo = async (token: string, uid: string, clickId: string, reason: string) => {
    const response = await updateClickApi(token, uid, clickId, reason);
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

export const getAppSettingsRepo = async (token: string, uid: string, onResponse: (surveyIconColor: string, navigationColor: string, isOffersEnable: boolean, currencyUrl?: string) => void) => {
    const response = await getAppSettingsApi(token, uid);
    const body = await (response.json() as Promise<BitLabsResponse<GetAppSettingsResponse>>);

    if (body.error) {
        console.error(`${body.error.details.http} - ${body.error.details.msg}`);
        return;
    }

    onResponse(body.data.visual.survey_icon_color, body.data.visual.navigation_color, body.data.offers.enabled,
        body.data.currency.symbol.is_image ? body.data.currency.symbol.content : undefined);
}

export const getLeaderboardRepo = async (token: string, uid: string, onResponse: (leaderboard: GetLeaderboardResponse) => void) => {
    const response = await getLeaderboardApi(token, uid);
    const body = await (response.json() as Promise<BitLabsResponse<GetLeaderboardResponse>>);

    if (body.error) {
        console.error(`${body.error.details.http} - ${body.error.details.msg}`);
        return;
    }

    onResponse(body.data);
}

export const getCurrencyIconRepo = async (url: string, onResponse: (iconUri: string, isSvg: boolean) => void) => {
    const response = await fetch(new Request(url));
    const blob = await response.blob();

    const data = URL.createObjectURL(blob);

    onResponse(data, blob.type === 'image/svg+xml');
}