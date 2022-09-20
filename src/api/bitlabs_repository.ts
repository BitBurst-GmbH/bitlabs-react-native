import BitLabsApi from "./bitlabs_api";
import type { CheckSurveysResponse } from "./bitlabs_repository.types";


const init = (token: string, uid: string) => BitLabsApi.init(token, uid);

const checkSurveys = async (onResponse: (hasSurveys: boolean) => void) => {
    const response = await BitLabsApi.checkSurveys();
    const body = await (response.json() as Promise<CheckSurveysResponse>);

    if (body.error) {
        console.log(`${body.error.details.http} - ${body.error.details.msg}`);
        return;
    }

    onResponse(body.data.has_surveys);
}

export default {
    init: init,
    checkSurveys: checkSurveys
}
