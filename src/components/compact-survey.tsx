import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import SurveyStyles from '../styles/compact-survey.styles'
import RatingBar from './rating-bar'
import Images from '../assets/images'
import type { Survey } from '../api/bitlabs_repository.types'
import Gradient from './gradient'

type Props = {
    survey: Survey,
    colors: string[],
    onPress: () => void,
}

const Widget = ({ survey, colors, onPress }: Props) => {
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

            <View style={[styles.rightView]}>
                <Image
                    style={styles.playImage}
                    source={Images.circlePlayLight} />
                <View>
                    <Text style={styles.earnText}>EARN{'\n'}{survey.value}</Text>
                    <View style={{ flexDirection: 'row', }}>
                        <Text style={[styles.oldRewardText, { alignSelf: 'flex-end' }]}>{survey.value}</Text>
                        <Gradient colors={colors} rectRadius={5} style={{ marginHorizontal: 4 }}>
                            <Text style={styles.percentageText}>+20%</Text>
                        </Gradient>
                    </View>
                </View>
            </View>

        </TouchableOpacity>
    )
}

export default Widget;
