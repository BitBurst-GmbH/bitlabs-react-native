import { Platform } from 'react-native';
import { Buffer } from 'buffer';

export const buildApiURL = (
  path: string,
  queries: { [key: string]: string } = {}
) => {
  let url = `https://api.bitlabs.ai/${path}?platform=MOBILE`;
  Object.keys(queries).forEach(
    (key) => (url = url + `&${key}=${queries[key]}`)
  );
  return url;
};

export const buildOfferWallUrl = (
  token: string,
  uid: string,
  tags: { [key: string]: string | boolean },
  addSdkParameter: boolean
) => {
  let url = `https://web.bitlabs.ai?token=${token}&uid=${uid}&os=${Platform.OS}`;

  if (addSdkParameter) {
    url = url + '&sdk=REACT';
  }

  Object.keys(tags).forEach((key) => (url = url + `&${key}=${tags[key]}`));
  return url;
};

export const extractColors = (color: string) => {
  const colors = color
    .match(/linear-gradient\((\d+)deg,\s*(.+)\)/)?.[2]
    ?.replace(/([0-9]+)%/g, '')
    ?.split(',')
    .map((v) => v.trim());

  if (!colors) {
    const hex = color.match(/#([0-9a-f]{3,6})/i)?.[0];
    if (!hex) {
      return undefined;
    }
    return [hex, hex];
  }

  return colors;
};

const hexToLuminance = (hex: string) => {
  // Convert hex to RGB
  const r = parseInt(hex.substring(1, 3), 16) / 255;
  const g = parseInt(hex.substring(3, 5), 16) / 255;
  const b = parseInt(hex.substring(5, 7), 16) / 255;

  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  return luminance;
};

export const isColorLuminant = (colors: string[]) =>
  colors.some((color) => hexToLuminance(color.toString()) > 0.729);

export const rounded = (value: number) =>
  Math.round((value + Number.EPSILON) * 100) / 100;

export const encryptBase64 = (value: string) =>
  Buffer.from(value).toString('base64');

export const currencize = (value: string, currencyString: string) => {
  if (currencyString.length === 0) {
    return value;
  }

  if (currencyString.includes('{value}')) {
    return currencyString.replace('{value}', value);
  }

  return value + ' ' + currencyString;
};
