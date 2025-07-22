export type BitLabsResponse<T> = {
  data?: T;
  error?: {
    details: {
      http: string;
      msg: string;
    };
  };
  status: string;
  trace_id: string;
};

export type GetAppSettingsResponse = {
  configuration: [
    {
      internalIdentifier: string;
      value: string;
    }
  ];
};

export type Survey = {
  id: string;
  type: string;
  /** @deprecated Use `clickUrl` instead. */
  click_url: string;
  clickUrl: string;
  cpi: string;
  value: string;
  loi: number;
  country: string;
  language: string;
  rating: number;
  category: {
    name: string;
    /** @deprecated Use `iconUrl` instead. */
    icon_url: string;
    iconUrl: string;
    /** @deprecated Use `iconName` instead. */
    icon_name: string;
    iconName: string;
    /** @deprecated Use `nameInternal` instead. */
    name_internal: string;
    nameInternal: string;
  };
  tags: [];
};

export type SurveyProperties = {
  colors: string[];
  onPress: () => void;
  currencyString: string;
  bonusPercentage: number;
  currencyIcon?: JSX.Element;
  oldCurrency?: JSX.Element;
};

export type HookMessage = {
  type: string;
  name: HookName;
  args: any[];
};

export enum HookName {
  init = 'offerwall-core:init',
  SdkClose = 'offerwall-core:sdk.close',
  SurveyStart = 'offerwall-surveys:survey.start',
  SurveyComplete = 'offerwall-surveys:survey.complete',
  SurveyScreenout = 'offerwall-surveys:survey.screenout',
  SurveyStartBonus = 'offerwall-surveys:survey.start-bonus',
  OfferStart = 'offerwall-offers:offer.start',
  OfferContinue = 'offerwall-offers:offer.continue',
}
