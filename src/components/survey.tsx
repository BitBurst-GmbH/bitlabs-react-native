import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { } from 'react'
import SurveyStyles from './survey.styles'
import RatingBar from './rating-bar'
import Images from '../assets/images'

type Props = {
    value: string,
    color?: string,
    margin?: number,
    onPress: () => void,
}

const Survey = ({ value, margin, color, onPress }: Props) => {
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
                    <Text style={styles.durationText}>1 Minutes</Text>
                </View>
                <RatingBar rating={3} />
            </View>
            <View style={styles.rightView}>
                <Image
                    style={styles.playImage}
                    source={Images.circlePlayLight} />
                <Text style={styles.earnText}>EARN{'\n'}{value}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default Survey;
