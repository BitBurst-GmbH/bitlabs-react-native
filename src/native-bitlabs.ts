import { NativeModules } from 'react-native';
import type { Survey } from './api/bitlabs-service/types';

interface BitLabsModule {
  configure: (token: string, uid: string) => void;
  configureAPI: (token: string, uid: string) => void;
  requestTrackingAuthorization: () => void;
  setTags: (tags: Record<string, string>) => void;
  addTag: (key: string, value: string) => void;
  launchOfferwall: () => void;
  getSurveys: () => Promise<Survey[]>;
  checkSurveys: () => Promise<boolean>;
  addListener(eventType: string): void;
  removeListeners(count: number): void;
}

export const { NativeBitLabs } = NativeModules as {
  NativeBitLabs: BitLabsModule;
};
