export type CheckSurveysResponse = {
    data: {
        has_surveys: boolean
    },
    error: {
        details: {
            http: string,
            msg: string
        }
    },
    status: string,
    trace_id: string
};
