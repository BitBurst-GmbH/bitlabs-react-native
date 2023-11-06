import { Platform } from "react-native";
import type { Survey } from "../api/types";
import { Buffer } from "buffer";

export const url = (path: string, queries: { [key: string]: string } = {}) => {
    let url = `https://api.bitlabs.ai/${path}?platform=MOBILE`;
    Object.keys(queries).forEach((key) => url = url + `&${key}=${queries[key]}`);
    return url;
}

export const offerWallUrl = (token: string, uid: string, tags: { [key: string]: string | boolean }) => {
    let url = `https://web.bitlabs.ai?token=${token}&uid=${uid}&sdk=REACT&os=${Platform.OS}`;

    Object.keys(tags).forEach((key) => url = url + `&${key}=${tags[key]}`);
    return url;
}

export const getRandomSurveys = () => {
    let surveys: Survey[] = [];

    for (let i = 0; i < 3; i++) {
        surveys.push({
            id: i.toString(),
            type: 'survey',
            cpi: '0.5',
            value: '0.5',
            loi: Math.random(),
            country: 'US',
            language: 'en',
            tags: [],
            category: {
                name: 'General',
                icon_url: '',
                icon_name: '',
                name_internal: '',
            },
            rating: Math.floor(Math.random() * 6),
            click_url: '',
        })
    }

    return surveys;
}

export const extractColors = (color: String) => color.match(/linear-gradient\((\d+)deg,\s*(.+)\)/)?.[2]
    ?.replace(/([0-9]+)%/g, '')
    ?.split(',')
    .map(v => v.trim())
    ?? [color, color];

const hexToLuminance = (hex: string) => {
    // Convert hex to RGB
    let r = parseInt(hex.substring(1, 3), 16) / 255;
    let g = parseInt(hex.substring(3, 5), 16) / 255;
    let b = parseInt(hex.substring(5, 7), 16) / 255;

    let luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    return luminance;
}

export const isColorLuminant = (colors: String[]) => colors.some(color => hexToLuminance(color.toString()) > 0.729);

export const rounded = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;

export const encryptBase64 = (value: string) => Buffer.from(value).toString('base64');
