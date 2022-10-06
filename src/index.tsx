import BitLabsRepository from "./api/bitlabs_repository";
import type { Survey } from "./api/bitlabs_repository.types";

// const LINKING_ERROR =
//   `The package 'bitlabs' doesn't seem to be linked. Make sure: \n\n` +
//   Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
//   '- You rebuilt the app after installing the package\n' +
//   '- You are not using Expo managed workflow\n';

// const Bitlabs = NativeModules.Bitlabs ? NativeModules.Bitlabs : new Proxy(
//   {},
//   {
//     get() {
//       throw new Error(LINKING_ERROR);
//     },
//   }
// );

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

const checkSurveys = (onResponse: (hasSurveys: boolean) => void) => ifInitialised(() =>
    BitLabsRepository.checkSurveys(onResponse));

const getSurveys = (onResponse: (surveys: [Survey]) => void) => ifInitialised(() =>
    BitLabsRepository.getSurveys(onResponse));

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