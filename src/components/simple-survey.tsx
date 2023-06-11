import React from 'react'
import { Image, Text, TouchableOpacity, View } from "react-native";
import Images from '../assets/images'
import SurveyStyles from '../styles/simple-survey.styles'
import type { Survey } from '../api/bitlabs_repository.types';


type Props = {
    survey: Survey,
    onPress: () => void,
}

const Widget = ({ survey, onPress }: Props) => {
    const styles = SurveyStyles();

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}>
            <Image
                style={styles.playImage}
                source={Images.circlePlayLight} />
            <View>
                <Text style={styles.earnText}>EARN {survey.value}</Text>
                <Text style={styles.durationText}>Now in {Math.round(survey.loi)} minutes!</Text>
            </View>
        </TouchableOpacity>
    );
}

export default Widget;