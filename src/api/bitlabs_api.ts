import { Platform } from "react-native";
import { url } from "../utils/helpers";

export const getSurveysApi = (token: string, uid: string) =>
    fetch(new Request(url('v2/client/surveys', { 'os': Platform.OS, 'sdk': 'REACT' }), { headers: { 'X-Api-Token': token, 'X-User-Id': uid } }));

export const updateClickApi = (token: string, uid: string, clickId: string, reason: string) =>
    fetch(new Request(url(`v2/client/clicks/${clickId}`),
        {
            method: 'POST',
            headers: {
                'X-User-Id': uid,
                'X-Api-Token': token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 'leave_survey': { reason: reason, } })
        }));

export const getAppSettingsApi = (token: string, uid: string) => fetch(new Request(url('v1/client/settings/v2'), {
    headers: { 'X-Api-Token': token, 'X-User-Id': uid }
}));

export const getLeaderboardApi = (token: string, uid: string) => fetch(new Request(url('v1/client/leaderboard'), {
    headers: { 'X-Api-Token': token, 'X-User-Id': uid }
}));

export const getCurrencyIconApi = (url: string) => fetch(new Request(url));
