import { NativeEventEmitter } from 'react-native';
import { NativeBitLabs } from './native-bitlabs';

const BitLabsEmitter = new NativeEventEmitter(NativeBitLabs);

const init = NativeBitLabs.configure;

const requestTrackingAuthorization = NativeBitLabs.requestTrackingAuthorization;

const setTags = NativeBitLabs.setTags;

let onReward = (_: number) => {};
const setOnReward = (callback: (reward: number) => void) => {
  onReward = callback;
};

const setOnOfferwallClosed = (onOfferwallClosed: () => void) => {
  BitLabsEmitter.addListener('onOfferwallClosed', ({ reward }) => {
    onReward(reward as number);
    onOfferwallClosed();
  });
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
