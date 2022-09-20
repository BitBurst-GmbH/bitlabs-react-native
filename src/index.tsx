import BitLabsRepository from "./api/bitlabs_repository";

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
let _onReward = (reward: string) => { };

const init = (token: string, uid: string) => {
    _uid = uid;
    _token = token;
    BitLabsRepository.init(token, uid);
}

const checkSurveys = () => ifInitialised(() =>
    BitLabsRepository.checkSurveys((hasSurveys => console.log(`Has Surveys: ${hasSurveys}`))));

const setTags = (tags: Map<string, any>) => _tags = tags;

const addTag = (key: string, value: any) => _tags.set(key, value);

const setOnReward = (onReward: (reward: string) => void) => {
    _onReward = onReward;
}

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
    checkSurveys: checkSurveys,
    setOnReward: setOnReward,
}