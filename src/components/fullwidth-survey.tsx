import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import type { Survey, SurveyProperties } from '../api/bitlabs_service/types';
import images from '../assets/images';
import SurveyStyles from '../styles/fullwidth-survey.styles';
import RatingBar from '../hoc/rating-bar';
import { RewardView } from '../hoc/reward-view';
import { currencize, rounded } from '../utils/helpers';

type Props = {
  survey: Survey;
  properties: SurveyProperties;
};

export default ({ survey, properties }: Props) => {
  const styles = SurveyStyles(properties.colors[0]?.toString() ?? '#007bff');
  const oldReward = rounded(
    parseFloat(survey.value) / (1 + properties.bonusPercentage)
  ).toString();

  return (
    <TouchableOpacity style={styles.container} onPress={properties.onPress}>
      <View style={styles.leftView}>
        <RatingBar rating={survey.rating} />
        <View style={styles.durationView}>
          <Image style={styles.durationImage} source={images.clockRegular} />
          <Text style={styles.rewardText}>
            {Math.round(survey.loi)} minutes
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View>
            {properties.bonusPercentage > 0 && (
              <RewardView
                styles={styles.oldRewardText}
                currency={properties.oldCurrency}
                value={currencize(oldReward, properties.currencyString)}
              />
            )}
            <RewardView
              styles={styles.rewardText}
              currency={properties.currencyIcon}
              value={currencize(survey.value, properties.currencyString)}
            />
          </View>
          {properties.bonusPercentage > 0 && (
            <Text style={styles.percentageText}>
              +{(properties.bonusPercentage * 100).toFixed(0)}%
            </Text>
          )}
        </View>
      </View>
      <View style={styles.rightView}>
        <Text style={styles.earnText}>EARN NOW</Text>
      </View>
    </TouchableOpacity>
  );
};
