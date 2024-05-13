export type BitLabsResponse<T> = {
  data: T;
  error: {
    details: {
      http: string;
      msg: string;
    };
  };
  status: string;
  trace_id: string;
};

export type GetSurveysResponse = {
  restriction_reason: RestrictionReason;
  surveys: Survey[];
};

export type GetAppSettingsResponse = {
  visual: {
    background_color: string;
    color_rating_threshold: number;
    custom_logo_url: string;
    element_border_radius: string;
    hide_reward_value: boolean;
    interaction_color: string;
    navigation_color: string;
    offerwall_width: string;
    screenout_reward: string;
    survey_icon_color: string;
  };
  currency: {
    bonus_percentage: number;
    currency_promotion: number;
    factor: string;
    floor_decimal: boolean;
    symbol: {
      content: string;
      is_image: boolean;
    };
  };
  promotion?: {
    start_date: string;
    end_date: string;
    bonus_percentage: number;
  };
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

type RestrictionReason = {
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
  SdkClose = 'offerwall-core:sdk.close',
  SurveyStart = 'offerwall-surveys:survey.start',
  SurveyComplete = 'offerwall-surveys:survey.complete',
  SurveyScreenout = 'offerwall-surveys:survey.screenout',
  SurveyStartBonus = 'offerwall-surveys:survey.start-bonus',
}
