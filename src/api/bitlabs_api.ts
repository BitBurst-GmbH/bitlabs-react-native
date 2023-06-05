import { Platform } from "react-native";
import { url } from "../utils/helpers";

export const checkSurveysApi = (token: string, uid: string) =>
    fetch(new Request(url('check'), { headers: { 'X-Api-Token': token, 'X-User-Id': uid } }));

export const getActionsApi = (token: string, uid: string) =>
    fetch(new Request(url('actions', { 'os': Platform.OS }), { headers: { 'X-Api-Token': token, 'X-User-Id': uid } }));

export const leaveSurveysApi = (token: string, uid: string, networkId: string, surveyId: string, reason: string) =>
    fetch(new Request(url(`networks/${networkId}/surveys/${surveyId}/leave`),
        {
            method: 'POST',
            headers: {
                'X-User-Id': uid,
                'X-Api-Token': token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ reason: reason, })
        }));

export const getOffersApi = (token: string, uid: string) => fetch(new Request(url('offers'), {
    headers: { 'X-User-Id': uid, 'X-Api-Token': token }
}));

export const getAppSettingsApi = (token: string, uid: string) => fetch(new Request(url('settings/v2'), {
    headers: { 'X-Api-Token': token, 'X-User-Id': uid }
}));

export const getLeaderboardApi = (token: string, uid: string) => fetch(new Request(url('leaderboard'), {
    headers: { 'X-Api-Token': token, 'X-User-Id': uid }
}));
