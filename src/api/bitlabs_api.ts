import { Platform } from "react-native";
import { url } from "../utils/helpers";

let headers: { [key: string]: string };

const init = (token: string, uid: string) => headers = { 'X-Api-Token': token, 'X-User-Id': uid };

const checkSurveys = () => fetch(new Request(url('check'), { headers: headers }));

const getActions = () =>
    fetch(new Request(url('actions', { 'os': Platform.OS }), { headers: { ...headers } }));


export default {
    init: init,
    checkSurveys: checkSurveys,
    getActions: getActions
}


// Future<Response> getOffers() => get(url('offers'), headers: _headers);

// Future<Response> leaveSurveys(
//   String networkId,
//   String surveyId,
//   String reason,
// ) {
//   return post(
//     url('networks/$networkId/surveys/$surveyId/leave'),
//     headers: {..._headers},
//     body: jsonEncode({'reason': reason}),
//   );
// }

// Future<Response> getAppSettings() =>
//     get(url('settings/v2'), headers: _headers);