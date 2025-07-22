import { NativeEventEmitter } from 'react-native';
import { NativeBitLabs } from './native-bitlabs';

const BitLabsEmitter = new NativeEventEmitter(NativeBitLabs);

const init = (token: string, uid: string) => {
  NativeBitLabs.configure(token, uid);

  BitLabsEmitter.addListener('onOfferwallClosed', ({ reward }) => {
    onReward(reward as number);
    onOfferwallClosed();
  });
};

const requestTrackingAuthorization = NativeBitLabs.requestTrackingAuthorization;

const setTags = NativeBitLabs.setTags;

let onReward = (_: number) => {};
const setOnReward = (callback: (reward: number) => void) => {
  onReward = callback;
};

let onOfferwallClosed = () => {};
const setOnOfferwallClosed = (callback: () => void) => {
  onOfferwallClosed = callback;
};

const launch = NativeBitLabs.launchOfferwall;

export default {
  init,
  launch,
  setTags,
  setOnReward,
  setOnOfferwallClosed,
  requestTrackingAuthorization,
};
