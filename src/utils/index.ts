import { Platform } from 'react-native';

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

export const encryptBase64 = (value: string) =>
  Buffer.from(value).toString('base64');

export const generateUUID4 = () =>
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.floor(Math.random() * 16);
    const v = c === 'x' ? r : makeRBetween8AndBInHexadecimal(r);
    return v.toString(16);
  });

const makeRBetween8AndBInHexadecimal = (r: number) => {
  const lastTwobits = r % 4;
  return 8 + lastTwobits;
};
