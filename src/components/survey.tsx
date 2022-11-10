import { View, Text, Image } from 'react-native'
import React from 'react'
import styles from './survey.styles'
import RatingBar from './rating-bar'

export default () => {
    return (
        <View style={styles.container}>
            <View style={styles.leftView}>
                <View style={styles.durationView}>
                    <Image
                        style={styles.durationImage}
                        source={require('../assets/clock-regular.png')} />
                    <Text style={styles.durationText}>1 Minutes</Text>
                </View>
                <RatingBar />
            </View>
            <View style={styles.rightView}>
                <Image
                    style={styles.playImage}
                    source={require('../assets/circle-play-light.png')} />
                <Text style={styles.earnText}>EARN{'\n'}0.005</Text>
            </View>
        </View>
    )
}
