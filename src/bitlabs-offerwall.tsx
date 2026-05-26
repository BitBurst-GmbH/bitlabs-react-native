import { NativeEventEmitter, type EmitterSubscription } from 'react-native';
import { NativeBitLabs } from './native-bitlabs';

const BitLabsEmitter = new NativeEventEmitter(NativeBitLabs);

let subscription: EmitterSubscription | null = null;

const init = (token: string, uid: string) => {
  NativeBitLabs.configure(token, uid);

  subscription?.remove();
  subscription = BitLabsEmitter.addListener(
    'onOfferwallClosed',
    ({ reward }) => {
      onReward(reward as number);
      onOfferwallClosed();
    },
  );
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

const openOffer = NativeBitLabs.openOffer;

const openMagicReceiptsOffer = NativeBitLabs.openMagicReceiptsOffer;

const openMagicReceiptsMerchant = NativeBitLabs.openMagicReceiptsMerchant;

export default {
  init,
  launch,
  setTags,
  setOnReward,
  openOffer,
  openMagicReceiptsOffer,
  openMagicReceiptsMerchant,
  setOnOfferwallClosed,
  requestTrackingAuthorization,
};
