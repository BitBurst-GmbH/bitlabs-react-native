import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import type { Survey } from "../api/bitlabs_repository.types";
import images from "../assets/images";
import SurveyStyles from "../styles/fullwidth-survey.styles";
import RatingBar from "../hoc/rating-bar";
import { RewardView } from "../hoc/reward-view";


type Props = {
    survey: Survey,
    color: string,
    onPress: () => void,
    currency?: React.JSX.Element,
    oldCurrency?: React.JSX.Element,
}

export default ({ survey, color, onPress, currency, oldCurrency }: Props) => {
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
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View>
                        <RewardView styles={styles.oldRewardText} currency={oldCurrency} value={survey.value} />
                        <RewardView styles={styles.rewardText} currency={currency} value={survey.value} />
                    </View>
                    <Text style={styles.percentageText}>+20%</Text>
                </View>
            </View>
            <View style={styles.rightView}><Text style={styles.earnText}>EARN NOW</Text></View>
        </TouchableOpacity>
    );
}