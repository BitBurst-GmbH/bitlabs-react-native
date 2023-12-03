import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import type { User } from '../api/types';
import images from '../assets/images';
import { currencize } from '../utils/helpers';

type Props = {
  user: User;
  color: string;
  factor: number;
  isOwnUser: boolean;
  currencyString: string;
  currencyIcon?: JSX.Element;
};

const LeaderboardItem = ({
  user,
  color,
  factor,
  isOwnUser,
  currencyString,
  currencyIcon,
}: Props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 4,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={[styles.text, { marginEnd: 14 }]}>{user.rank}</Text>
        <Text style={[styles.text]}>{user.name}</Text>
        {isOwnUser && <Text style={styles.youText}>(You)</Text>}
        {user.rank < 4 && (
          <View style={{ marginHorizontal: 12, alignItems: 'center' }}>
            <Image
              source={images.trophySolid}
              style={[styles.trophyImage, { tintColor: color }]}
            />
            <Text style={{ fontSize: 11, color: '#fff', fontWeight: '500' }}>
              {user.rank}
            </Text>
          </View>
        )}
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={[styles.text]}>
          {currencize(
            (user.earnings_raw * factor).toLocaleString(
              'en-us',
              factor > 1 ? { maximumFractionDigits: 0 } : undefined
            ),
            currencyString
          )}
        </Text>
        {currencyIcon}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    marginHorizontal: 4,
  },
  youText: {
    fontSize: 12,
    fontWeight: '500',
    color: 'blue',
  },
  trophyImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    position: 'absolute',
  },
});

export default LeaderboardItem;
