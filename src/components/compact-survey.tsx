import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import SurveyStyles from './compact-survey.styles'
import RatingBar from './rating-bar'
import Images from '../assets/images'
import type { Survey } from '../api/bitlabs_repository.types'

type Props = {
    survey: Survey,
    color?: string,
    margin?: number,
    onPress: () => void,
}

const Widget = ({ survey, margin, color, onPress }: Props) => {
    const styles = SurveyStyles(margin ?? 0, color ?? '#007bff');

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}>
            <View style={styles.leftView}>
                <View style={styles.durationView}>
                    <Image
                        style={styles.durationImage}
                        source={Images.clockRegular} />
                    <Text style={styles.durationText}>{survey.loi} minutes</Text>
                </View>
                <RatingBar rating={survey.rating} />
            </View>
            <View style={styles.rightView}>
                <Image
                    style={styles.playImage}
                    source={Images.circlePlayLight} />
                <Text style={styles.earnText}>EARN{'\n'}{survey.value}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default Widget;
