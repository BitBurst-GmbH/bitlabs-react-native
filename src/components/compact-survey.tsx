import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import SurveyStyles from '../styles/compact-survey.styles'
import RatingBar from '../hoc/rating-bar'
import Images from '../assets/images'
import type { Survey } from '../api/bitlabs_repository.types'
import Gradient from '../hoc/gradient'
import { RewardView } from '../hoc/reward-view'

type Props = {
    survey: Survey,
    colors: string[],
    onPress: () => void,
    currency?: React.JSX.Element,
    oldCurrency?: React.JSX.Element,
}

const Widget = ({ survey, colors, onPress, currency, oldCurrency }: Props) => {
    const styles = SurveyStyles(colors[0]?.toString() ?? '#007bff');

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}>
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
                    <View>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={styles.earnText}>EARN</Text>
                            <RewardView styles={styles.earnText} value={survey.value} currency={currency} />
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end' }}>
                    <RewardView styles={styles.oldRewardText} value={survey.value} currency={oldCurrency} />
                    <Gradient colors={colors} rectRadius={5} style={{ marginHorizontal: 2 }}>
                        <Text style={styles.percentageText}>+20%</Text>
                    </Gradient>
                </View>
            </View>

        </TouchableOpacity>
    )
}

export default Widget;
