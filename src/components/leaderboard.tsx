import React, { useEffect, useState } from 'react';
import type { GetLeaderboardResponse } from '../api/bitlabs_service/types';
import {
  getAppSettings,
  getIsImageSVG,
  getLeaderboard,
} from '../api/bitlabs_service';
import { FlatList, Text, View } from 'react-native';
import LeaderboardItem from './leaderboard-item';
import { extractColors } from '../utils';
import { CurrencyIcon } from '../hoc/currency-icon';

type Props = {
  uid: string;
  token: string;
};

const Divider = () => (
  <View style={{ height: 1, backgroundColor: '#000', marginHorizontal: 4 }} />
);

/** @deprecated Use `BitLabsWidget` instead. */
export default ({ uid, token }: Props) => {
  const [factor] = useState(1);
  const [color, setColor] = useState('#000');
  const [currencyString, setCurrency] = useState('');
  const [currencyIcon, setCurrencyIcon] = useState<JSX.Element>();
  const [leaderboard, setLeaderboard] = useState<GetLeaderboardResponse>();

  useEffect(() => {
    getLeaderboard(token, uid, (leaderboardResponse) =>
      setLeaderboard(leaderboardResponse)
    ).catch((error) => console.error(error));
    getAppSettings(token, (settings) => {
      const config = settings.configuration;
      const isImage =
        config.find(
          (c) => c.internalIdentifier === 'general.currency.symbol.is_image'
        )?.value ?? '0';
      const content =
        config.find(
          (c) => c.internalIdentifier === 'general.currency.symbol.content'
        )?.value ?? '';

      if (isImage) {
        getIsImageSVG(content, (isSvg) =>
          setCurrencyIcon(
            <CurrencyIcon isSVG={isSvg} url={content} size={20} />
          )
        ).catch((error) => console.error(error));
      } else {
        setCurrency(content);
      }

      const surveyIconColor =
        config.find(
          (c) => c.internalIdentifier === 'app.visual.light.survey_icon_color'
        )?.value ?? '';

      setColor(extractColors(surveyIconColor)?.[0] ?? '#000');
    }).catch((error) => console.error(error));
  }, [token, uid]);

  return leaderboard?.top_users ? (
    <View style={{ alignSelf: 'stretch', height: '25%' }}>
      <Text style={{ fontSize: 20 }}>Leaderboard</Text>
      {leaderboard.own_user ? (
        <Text>
          You are currently ranked {leaderboard.own_user.rank} on our
          leaderboard.
        </Text>
      ) : (
        <Text>Participate in a survey to join the leaderboard.</Text>
      )}
      <FlatList
        data={leaderboard?.top_users}
        ItemSeparatorComponent={Divider}
        renderItem={({ item }) => (
          <LeaderboardItem
            user={item}
            color={color}
            factor={factor}
            currencyIcon={currencyIcon}
            currencyString={currencyString}
            isOwnUser={leaderboard?.own_user?.rank === item.rank}
          />
        )}
      />
    </View>
  ) : null;
};
