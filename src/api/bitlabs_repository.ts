import BitLabsApi from "./bitlabs_api";


const init = (token: string, uid: string) => BitLabsApi.init(token, uid);

const checkSurveys = (onResponse: (hasSurveys: string) => void) => {
    BitLabsApi.checkSurveys()
        .then((response) => response.json())
        .then((json) => onResponse(json));
}

export default {
    init: init,
    checkSurveys: checkSurveys
}

//   void checkSurveys(void Function(bool) onResponse,
//       void Function(Exception) onFailure) async {
//     final response = await _bitLabsApi.checkSurveys();
//     final body = BitLabsResponse<CheckSurveysResponse>.fromJson(
//         jsonDecode(response.body), (data) => CheckSurveysResponse(data!));

//     final error = body.error;
//     if (error != null) {
//       onFailure(Exception('${error.details.http} - ${error.details.msg}'));
//       return;
//     }

//     final hasSurveys = body.data?.hasSurveys;
//     if (hasSurveys != null) onResponse(hasSurveys);
//   }
