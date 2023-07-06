import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import SurveyStyles from '../styles/compact-survey.styles'
import RatingBar from '../hoc/rating-bar'
import Images from '../assets/images'
import type { Survey, SurveyProperties } from '../api/types'
import Gradient from '../hoc/gradient'
import { RewardView } from '../hoc/reward-view'

type Props = {
    survey: Survey,
    properties: SurveyProperties,
}

const Widget = ({ survey, properties }: Props) => {
    const styles = SurveyStyles(properties.colors[0]?.toString() ?? '#007bff');

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={properties.onPress}>
            <View style={styles.leftView}>
                <View style={styles.durationView}>
                    <Image
                        style={styles.durationImage}
                        source={Images.clockRegular} />
                    <Text style={styles.durationText}>{Math.round(survey.loi)} minutes</Text>
                </View>
                <RatingBar rating={survey.rating} />
            </View>

            <View style={styles.rightView}>
                <View style={styles.earnView}>
                    <Image
                        style={styles.playImage}
                        source={Images.circlePlayLight} />
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.earnText}>EARN</Text>
                        <RewardView styles={styles.earnText} value={survey.value} currency={properties.currency} />
                    </View>
                </View>
                {properties.bonusPercentage > 0 && <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end' }}>
                    <RewardView styles={styles.oldRewardText} value={survey.value} currency={properties.oldCurrency} />
                    <Gradient colors={properties.colors} rectRadius={5} style={{ marginHorizontal: 2 }}>
                        <Text style={styles.percentageText}>+{properties.bonusPercentage}%</Text>
                    </Gradient>
                </View>}
            </View>

        </TouchableOpacity>
    )
}

export default Widget;
