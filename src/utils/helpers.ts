import type { Survey } from "../api/bitlabs_repository.types";

export const url = (path: string, queries: { [key: string]: string } = {}) => {
    let url = `https://api.bitlabs.ai/v1/client/${path}?platform=MOBILE`;
    Object.keys(queries).forEach((key) => url = url + `&${key}=${queries[key]}`);
    return url;
}

// TODO: Add sdk='REACT_NATIVE' parameter
export const offerWallUrl = (token: string, uid: string, tags: { [key: string]: string }) => {
    let url = `web.bitlabs.ai?token=${token}&uid=${uid}`;

    Object.keys(tags).forEach((key) => url = url + `&${key}=${tags[key]}`);
    return url;
}

export const getRandomSurveys = () => {
    let surveys: Survey[] = [];

    for (let i = 0; i < 3; i++) {
        surveys.push({
            network_id: Math.floor(Math.random() * 1000),
            id: i,
            cpi: '0.5',
            value: '0.5',
            loi: Math.random(),
            remaining: 3,
            details: {
                category: {
                    name: 'General',
                    icon_url: '',
                }
            },
            rating: Math.floor(Math.random() * 6),
            link: '',
            missing_questions: 0,
        })
    }

    return surveys;
}
