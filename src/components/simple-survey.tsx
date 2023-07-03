import React from 'react'
import { Image, Text, TouchableOpacity, View } from "react-native";
import Images from '../assets/images'
import SurveyStyles from '../styles/simple-survey.styles'
import type { Survey } from '../api/bitlabs_repository.types';


type Props = {
    color: string,
    survey: Survey,
    onPress: () => void,
}

const Widget = ({ color, survey, onPress }: Props) => {
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
                    <View>
                        <Text style={[styles.oldRewardText, { alignSelf: 'flex-end' }]}>{survey.value}</Text>
                        <Text style={styles.earnText}>EARN {survey.value}</Text>
                    </View>
                    <View>
                        <Text style={styles.percentageText}>+20%</Text>
                    </View>
                </View>
                <Text style={styles.durationText}>Now in {Math.round(survey.loi)} minutes!</Text>
            </View>
        </TouchableOpacity>
    );
}

export default Widget;