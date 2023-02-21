import React from 'react'
import { Image, Text, TouchableOpacity, View } from "react-native";
import Images from '../assets/images'
import SurveyStyles from '../styles/simple-survey.styles'
import type { Survey } from '../api/bitlabs_repository.types';


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
            <Image
                style={styles.playImage}
                source={Images.circlePlayLight} />
            <View>
                <Text style={styles.earnText}>EARN {survey.value}</Text>
                <Text style={styles.durationText}>Now in {survey.loi} minutes!</Text>
            </View>
        </TouchableOpacity>
    );
}

export default Widget;