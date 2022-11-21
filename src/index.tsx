import { checkSurveysRepo, getSurveysRepo } from "./api/bitlabs_repository";
import type { Survey } from "./api/bitlabs_repository.types";

export const checkSurveys = (token: string, uid: string, onResponse: (hasSurveys: boolean) => void, onFailure: (error: Error) => void) =>
    checkSurveysRepo(token, uid, onResponse, onFailure);

export const getSurveys = (token: string, uid: string, onResponse: (surveys: Survey[]) => void, onFailure: (error: Error) => void) =>
    getSurveysRepo(token, uid, onResponse, onFailure);
