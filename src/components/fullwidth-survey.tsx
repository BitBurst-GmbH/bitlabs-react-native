import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import type { Survey } from "../api/bitlabs_repository.types";
import images from "../assets/images";
import SurveyStyles from "../styles/fullwidth-survey.styles";
import RatingBar from "./rating-bar";


type Props = {
    survey: Survey,
    color?: string,
    margin?: number,
    onPress: () => void,
}

export default ({ survey, margin, color, onPress }: Props) => {
    const styles = SurveyStyles(margin ?? 0, color ?? '#007bff');

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}>
            <View style={styles.leftView}>
                <RatingBar rating={survey.rating} />
                <View style={styles.durationView}>
                    <Image style={styles.durationImage} source={images.clockRegular} />
                    <Text style={styles.rewardText}>{survey.loi} minutes</Text>
                </View>
                <Text style={styles.rewardText}>{survey.value}</Text>
            </View>
            <Text style={styles.rightView}>EARN NOW</Text>
        </TouchableOpacity>
    );
}