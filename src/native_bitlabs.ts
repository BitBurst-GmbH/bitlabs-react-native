import { NativeModules } from 'react-native';
import type { Survey } from './api/bitlabs_service/types';

interface BitLabsModule {
  configure: (token: string, uid: string) => void;
  configureAPI: (token: string, uid: string) => void;
  setTags: (tags: Record<string, string>) => void;
  addTag: (key: string, value: string) => void;
  launchOfferwall: () => void;
  getSurveys: () => Promise<Survey[]>;
  checkSurveys: () => Promise<boolean>;
}

export const { NativeBitLabs } = NativeModules as {
  NativeBitLabs: BitLabsModule;
};
