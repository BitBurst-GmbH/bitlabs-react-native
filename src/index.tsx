import BitLabsRepository from "./api/bitlabs_repository";
import type { Survey } from "./api/bitlabs_repository.types";

let _uid = '';
let _token = '';
let _tags = new Map<string, any>();
let _onReward = (_: string) => { };

const init = (token: string, uid: string) => {
    _uid = uid;
    _token = token;
    BitLabsRepository.init(token, uid);
}

const setTags = (tags: Map<string, any>) => _tags = tags;

const addTag = (key: string, value: any) => _tags.set(key, value);

const setOnReward = (onReward: (reward: string) => void) => {
    _onReward('');
    _onReward = onReward;
}

const checkSurveys = (onResponse: (hasSurveys: boolean) => void, onFailure: (error: Error) => void) =>
    ifInitialised(() => BitLabsRepository.checkSurveys(onResponse, onFailure));

const getSurveys = (onResponse: (surveys: Survey[]) => void, onFailure: (error: Error) => void) => ifInitialised(() =>
    BitLabsRepository.getSurveys(_token, _uid, onResponse, onFailure));

const ifInitialised = (block: () => void) => {
    if (_token === '' && _uid === '') {
        console.log('[BitLabs] Trying to use the BitLabs without initialising it!'
            + 'You should initialise BitLabs first! Call BitLabs.init()');
        return;
    }
    block();
}

export default {
    init: init,
    setTags: setTags,
    addTag: addTag,
    checkSurveys: checkSurveys,
    setOnReward: setOnReward,
    getSurveys: getSurveys,
}