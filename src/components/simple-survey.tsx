import React from 'react'
import { Image, Text, TouchableOpacity, View } from "react-native";
import Images from '../assets/images'
import SurveyStyles from '../styles/simple-survey.styles'
import type { Survey } from '../api/bitlabs_repository.types';
import { RewardView } from '../hoc/reward-view';


type Props = {
    color: string,
    survey: Survey,
    onPress: () => void,
    currency?: React.JSX.Element,
    oldCurrency?: React.JSX.Element,
}

const Widget = ({ color, survey, onPress, currency, oldCurrency }: Props) => {
    const styles = SurveyStyles(color);

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}>
            <Image
                style={styles.playImage}
                source={Images.circlePlayLight} />
            <View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ alignItems: 'flex-end' }}>
                        <RewardView value={survey.value} currency={oldCurrency} styles={styles.oldRewardText} />
                        <RewardView value={`EARN ${survey.value}`} currency={currency} styles={styles.earnText} />
                    </View>
                    <Text style={styles.percentageText}>+20%</Text>
                </View>
                <Text style={styles.durationText}>Now in {Math.round(survey.loi)} minutes!</Text>
            </View>
        </TouchableOpacity>
    );
}

export default Widget;