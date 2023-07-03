import { getAppSettingsApi, getLeaderboardApi, getOffersApi, getSurveysApi, updateClickApi } from "./bitlabs_api";
import type { BitLabsResponse, GetAppSettingsResponse, GetLeaderboardResponse, GetOffersResponse, GetSurveysResponse, Survey } from "./bitlabs_repository.types";


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

export const getHasOffers = async (token: string, uid: string) => getOffersApi(token, uid)
    .then(response => response.json() as Promise<BitLabsResponse<GetOffersResponse>>)
    .then(body => {
        if (body.error) throw new Error(`[BitLabs] ${body.error.details.http} - ${body.error.details.msg}`);

        return body.data.offers.length > 0;
    })
    .catch(error => console.error(error));

export const getAppSettings = async (token: string, uid: string, onResponse: (surveyIconColor: string, navigationColor: string, isOffersEnable: boolean, currencyUrl?: string) => void) => getAppSettingsApi(token, uid)
    .then(response => response.json() as Promise<BitLabsResponse<GetAppSettingsResponse>>)
    .then(body => {
        if (body.error) throw new Error(`[BitLabs] ${body.error.details.http} - ${body.error.details.msg}`);

        onResponse(body.data.visual.survey_icon_color, body.data.visual.navigation_color, body.data.offers.enabled,
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

export const getCurrencyIcon = async (url: string, onResponse: (iconUri: string, isSvg: boolean) => void) => fetch(new Request(url))
    .then(response => response.blob())
    .then(blob => onResponse(URL.createObjectURL(blob), blob.type === 'image/svg+xml'))
    .catch(error => console.error(error));
