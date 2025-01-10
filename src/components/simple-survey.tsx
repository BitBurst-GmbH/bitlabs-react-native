import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Images from '../assets/images';
import SurveyStyles from '../styles/simple-survey.styles';
import type { Survey, SurveyProperties } from '../api/bitlabs/types';
import { RewardView } from '../hoc/reward-view';
import { currencize, rounded } from '../utils/helpers';

type Props = {
  survey: Survey;
  properties: SurveyProperties;
};

const Widget = ({ survey, properties }: Props) => {
  const styles = SurveyStyles(properties.colors[0]?.toString() ?? '#007bff');
  const oldReward = rounded(
    parseFloat(survey.value) / (1 + properties.bonusPercentage)
  ).toString();

  return (
    <TouchableOpacity style={styles.container} onPress={properties.onPress}>
      <Image style={styles.playImage} source={Images.circlePlayLight} />
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ alignItems: 'flex-end' }}>
            {properties.bonusPercentage > 0 && (
              <RewardView
                value={currencize(oldReward, properties.currencyString)}
                currency={properties.oldCurrency}
                styles={styles.oldRewardText}
              />
            )}
            <RewardView
              value={`EARN ${currencize(
                survey.value,
                properties.currencyString
              )}`}
              currency={properties.currencyIcon}
              styles={styles.earnText}
            />
          </View>
          {properties.bonusPercentage > 0 && (
            <Text style={styles.percentageText}>
              +{(properties.bonusPercentage * 100).toFixed(0)}%
            </Text>
          )}
        </View>
        <Text style={styles.durationText}>
          Now in {Math.round(survey.loi)} minutes!
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Widget;
