import React from 'react';
import { Image } from 'react-native';
import { SvgFromUri } from 'react-native-svg';

type Props = {
  isSVG: boolean;
  size: number;
  url: string;
};

export const CurrencyIcon = ({ size, url, isSVG }: Props) =>
  isSVG ? (
    <SvgFromUri
      uri={url}
      width={size}
      height={size}
      style={{ marginHorizontal: 2 }}
    />
  ) : (
    <Image
      source={{ uri: url }}
      style={{ width: size, height: size, resizeMode: 'contain' }}
    />
  );
