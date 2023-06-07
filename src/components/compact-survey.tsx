import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import SurveyStyles from '../styles/compact-survey.styles'
import RatingBar from './rating-bar'
import Images from '../assets/images'
import type { Survey } from '../api/bitlabs_repository.types'

type Props = {
    survey: Survey,
    color?: string,
    onPress: () => void,
}

const Widget = ({ survey, color, onPress }: Props) => {
    const styles = SurveyStyles(color ?? '#007bff');

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
