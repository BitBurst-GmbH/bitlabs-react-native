import { NativeModules } from 'react-native';
import type { Survey } from './api/bitlabs-api/types';

interface BitLabsModule {
  configure: (token: string, uid: string) => void;
  configureAPI: (token: string, uid: string) => void;
  requestTrackingAuthorization: () => void;
  setTags: (tags: Record<string, string>) => void;
  addTag: (key: string, value: string) => void;
  launchOfferwall: () => void;
  getSurveys: () => Promise<Survey[]>;
  checkSurveys: () => Promise<boolean>;
  openOffer: (offerId: string) => void;
  openMagicReceiptsOffer: (offerId: string) => void;
  openMagicReceiptsMerchant: (merchantId: string) => void;
  addListener(eventType: string): void;
  removeListeners(count: number): void;
}

export const { NativeBitLabs } = NativeModules as {
  NativeBitLabs: BitLabsModule;
};
