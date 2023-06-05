export type BitLabsResponse<T> = {
    data: T,
    error: {
        details: {
            http: string,
            msg: string
        }
    },
    status: string,
    trace_id: string
};

export type CheckSurveyResponse = {
    has_surveys: boolean,
}

export type GetActionsResponse = {
    is_new_user: boolean,
    startBonus: { reward: string },
    restriction_reason: RestrictionReason,
    surveys: Survey[],
    qualification: Qualification,
}

export type GetOffersResponse = {
    offers: { id: number, }[],
}

export type GetAppSettingsResponse = {
    visual: {
        background_color: string,
        color_rating_threshold: number,
        custom_logo_url: string,
        element_border_radius: string,
        hide_reward_value: boolean,
        interaction_color: string,
        navigation_color: string,
        offerwall_width: string,
        screenout_reward: string,
        survey_icon_color: string,
    },
    offers: {
        enabled: boolean,
    }
}

export type GetLeaderboardResponse = {
    next_reset_at: String,
    own_user: User,
    rewards: Reward[],
    top_users: User[],
}

export type Survey = {
    network_id: number,
    id: number,
    cpi: string,
    value: string,
    loi: number,
    remaining: number,
    details: {
        category: {
            name: string
            icon_url: string
        }
    },
    rating: number,
    link: string,
    missing_questions: number,
}

type RestrictionReason = {
    not_verified: boolean,
    using_vpn: boolean,
    banned_until: string,
    reason: string,
    unsupported_country: string,
}

type Qualification = {
    network_id: number,
    question_id: string,
    country: string,
    language: string,
    question: Question,
    is_standard_profile: boolean,
    is_start_bonus: boolean,
    score: number,
    sequence: number,
}

type Question = {
    network_id: number,
    id: string,
    country: string,
    language: string,
    type: string,
    localized_text: string,
    answers: {
        code: string,
        localized_text: string,
    }[];
    can_skip: boolean,
}

type Reward = {
    rank: number,
    reward_raw: number,
}

export type User = {
    earnings_raw: number,
    name: String,
    rank: number,
}
