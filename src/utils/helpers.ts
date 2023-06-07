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

export const extractColors = (color: String) => color.match(/linear-gradient\((\d+)deg,\s*(.+)\)/)?.[2]
    ?.replace(/([0-9]+)%/g, '')
    ?.split(',')
    .map(v => v.trim())
    ?? [color, color];

export const hexToLuminance = (hex: string) => {
    // Convert hex to RGB
    let r = parseInt(hex.substring(1, 3), 16) / 255;
    let g = parseInt(hex.substring(3, 5), 16) / 255;
    let b = parseInt(hex.substring(5, 7), 16) / 255;

    let luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    return luminance;
}
