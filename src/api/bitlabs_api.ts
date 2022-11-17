import { Platform } from "react-native";
import { url } from "../utils/helpers";

let headers: { [key: string]: string };

const init = (token: string, uid: string) => headers = { 'X-Api-Token': token, 'X-User-Id': uid };

const checkSurveys = () => fetch(new Request(url('check'), { headers: headers }));

const getActions = (token: string, uid: string) =>
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

export default {
    init: init,
    getActions: getActions,
    checkSurveys: checkSurveys,
}