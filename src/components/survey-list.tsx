import { FlatList, StyleProp, ViewStyle } from 'react-native'
import React, { useEffect, useState } from 'react'
import SurveyComponent from './survey';
import type { Survey } from '../api/bitlabs_repository.types';
import { getColorRepo, getSurveysRepo } from '../api/bitlabs_repository';

type Props = {
  uid: string,
  token: string,
  onPress: () => void,
  style?: StyleProp<ViewStyle>,
}

const SurveyList = ({ uid, token, style, onPress }: Props) => {
  const [surveys, setSurveys] = useState<Survey[]>([])
  const [color, setColor] = useState('#007bff');

  useEffect(() => {
    getSurveysRepo(token, uid, (surveyList) => setSurveys(surveyList), (error) => console.error(`[BitLabs] ${error}`));
    getColorRepo(token, uid, (color) => setColor(color));
  }, []);

  return (
    <FlatList
      data={surveys}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => <SurveyComponent color={color} onPress={onPress} margin={4} value={item.value} />}
      style={[style, { flexGrow: 0, marginVertical: 12 }]}
    />
  )
}

export default SurveyList;