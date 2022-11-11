import { View, Text, Image } from 'react-native'
import React, { } from 'react'
import SurveyStyles from './survey.styles'
import RatingBar from './rating-bar'
import Images from '../assets/images'

type Props = {
    color?: string,
    margin?: number,
}

const Survey = ({ margin, color }: Props) => {
    const styles = SurveyStyles(margin ?? 0, color ?? '#daf');

    return (
        <View style={styles.container}>
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
                <Text style={styles.earnText}>EARN{'\n'}0.005</Text>
            </View>
        </View>
    )
}

export default Survey;
