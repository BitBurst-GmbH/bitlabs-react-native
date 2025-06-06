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

export type GetSurveysResponse = {
  restriction_reason?: RestrictionReason;
  surveys: Survey[];
};

export type GetAppSettingsResponse = {
  configuration: [
    {
      internalIdentifier: string;
      value: string;
    }
  ];
};

export type GetLeaderboardResponse = {
  next_reset_at: string;
  own_user: User;
  rewards: Reward[];
  top_users: User[];
};

export type Survey = {
  id: string;
  type: string;
  click_url: string;
  cpi: string;
  value: string;
  loi: number;
  country: string;
  language: string;
  rating: number;
  category: {
    name: string;
    icon_url: string;
    icon_name: string;
    name_internal: string;
  };
  tags: [];
};

export type RestrictionReason = {
  not_verified: boolean;
  using_vpn: boolean;
  banned_until: string;
  reason: string;
  unsupported_country: string;
};

type Reward = {
  rank: number;
  reward_raw: number;
};

export type User = {
  earnings_raw: number;
  name: string;
  rank: number;
};

export type SurveyProperties = {
  colors: string[];
  onPress: () => void;
  currencyString: string;
  bonusPercentage: number;
  currencyIcon?: JSX.Element;
  oldCurrency?: JSX.Element;
};

export enum WidgetType {
  Simple = 'simple',
  Compact = 'compact',
  FullWidth = 'full-width',
  Leaderboard = 'leaderboard',
}

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
