import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import type { Survey } from "../api/bitlabs_repository.types";
import images from "../assets/images";
import SurveyStyles from "../styles/fullwidth-survey.styles";
import RatingBar from "./rating-bar";


type Props = {
    survey: Survey,
    color: string,
    onPress: () => void,
}

export default ({ survey, color, onPress }: Props) => {
    const styles = SurveyStyles(color);

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}>
            <View style={styles.leftView}>
                <RatingBar rating={survey.rating} />
                <View style={styles.durationView}>
                    <Image style={styles.durationImage} source={images.clockRegular} />
                    <Text style={styles.rewardText}>{Math.round(survey.loi)} minutes</Text>
                </View>
                <Text style={styles.rewardText}>{survey.value}</Text>
            </View>
            <View style={styles.rightView}><Text style={styles.earnText}>EARN NOW</Text></View>
        </TouchableOpacity>
    );
}