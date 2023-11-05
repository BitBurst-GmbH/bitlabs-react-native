import { getAppSettingsApi, getLeaderboardApi, getSurveysApi, updateClickApi } from "./bitlabs_api";
import type { BitLabsResponse, GetAppSettingsResponse, GetLeaderboardResponse, GetSurveysResponse, Survey } from "./types";


export const getSurveysRepo = (token: string, uid: string, onResponse: (surveys: Survey[]) => void, onFailure: (error: Error) => void) => getSurveysApi(token, uid)
    .then(response => response.json() as Promise<BitLabsResponse<GetSurveysResponse>>)
    .then(body => {
        if (body.error) throw new Error(`[BitLabs] ${body.error.details.http} - ${body.error.details.msg}`);

        onResponse(body.data.surveys);
    })
    .catch(error => onFailure(error));

export const leaveSurveys = async (token: string, uid: string, clickId: string, reason: string) => updateClickApi(token, uid, clickId, reason)
    .then(response => response.json() as Promise<BitLabsResponse<void>>)
    .then(body => {
        if (body.error) throw new Error(`[BitLabs] ${body.error.details.http} - ${body.error.details.msg}`);

        console.log('[BitLabs] LeaveSurvey Successful');
    })
    .catch(error => console.error(error));

export const getAppSettings = async (token: string, uid: string, onResponse: (surveyIconColor: string, navigationColor: string, bonusPercentage: number, currencyUrl?: string) => void) => getAppSettingsApi(token, uid)
    .then(response => response.json() as Promise<BitLabsResponse<GetAppSettingsResponse>>)
    .then(body => {
        if (body.error) throw new Error(`[BitLabs] ${body.error.details.http} - ${body.error.details.msg}`);

        let bonusPercentage = body.data.currency.bonus_percentage / 100;
        if (body.data.promotion) bonusPercentage += body.data.promotion.bonus_percentage / 100 + bonusPercentage * body.data.promotion.bonus_percentage / 100;

        onResponse(
            body.data.visual.survey_icon_color,
            body.data.visual.navigation_color,
            bonusPercentage,
            body.data.currency.symbol.is_image ? body.data.currency.symbol.content : undefined);
    })
    .catch(error => console.error(error));

export const getLeaderboard = async (token: string, uid: string, onResponse: (leaderboard: GetLeaderboardResponse) => void) => getLeaderboardApi(token, uid)
    .then(response => response.json() as Promise<BitLabsResponse<GetLeaderboardResponse>>)
    .then(body => {
        if (body.error) throw new Error(`[BitLabs] ${body.error.details.http} - ${body.error.details.msg}`);

        onResponse(body.data);
    })
    .catch(error => console.error(error));

export const getIsImageSVG = async (url: string, onResponse: (isSVG: boolean) => void) => fetch(new Request(url))
    .then(response => onResponse(response.headers.get('content-type') === 'image/svg+xml'))
    .catch(error => console.error(error));
