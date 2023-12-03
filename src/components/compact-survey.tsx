import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import SurveyStyles from '../styles/compact-survey.styles';
import RatingBar from '../hoc/rating-bar';
import Images from '../assets/images';
import type { Survey, SurveyProperties } from '../api/types';
import Gradient from '../hoc/gradient';
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
      <View style={styles.leftView}>
        <View style={styles.durationView}>
          <Image style={styles.durationImage} source={Images.clockRegular} />
          <Text style={styles.durationText}>
            {Math.round(survey.loi)} minutes
          </Text>
        </View>
        <RatingBar rating={survey.rating} />
      </View>

      <View style={styles.rightView}>
        <View style={styles.earnView}>
          <Image style={styles.playImage} source={Images.circlePlayLight} />
          <View style={{ flexDirection: 'column' }}>
            <Text style={styles.earnText}>EARN</Text>
            <RewardView
              styles={styles.earnText}
              value={currencize(survey.value, properties.currencyString)}
              currency={properties.currencyIcon}
            />
          </View>
        </View>
        {properties.bonusPercentage > 0 && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'flex-end',
            }}
          >
            <RewardView
              styles={styles.oldRewardText}
              value={currencize(oldReward, properties.currencyString)}
              currency={properties.oldCurrency}
            />
            <Gradient
              colors={properties.colors}
              rectRadius={5}
              style={{ marginHorizontal: 2 }}
            >
              <Text style={styles.percentageText}>
                +{(properties.bonusPercentage * 100).toFixed(0)}%
              </Text>
            </Gradient>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Widget;
