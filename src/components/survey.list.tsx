import { FlatList, StyleProp, ViewStyle } from 'react-native'
import React, { useEffect, useState } from 'react'
import SurveyComponent from './survey';
import type { Survey } from '../api/bitlabs_repository.types';
import { getSurveys } from '../api/bitlabs_repository';

type Props = {
  uid: string,
  token: string,
  style?: StyleProp<ViewStyle>,
}

const SurveyList = ({ uid, token, style }: Props) => {
  const [surveys, setSurveys] = useState<Survey[]>([])

  useEffect(() => {
    getSurveys(token, uid, (surveyList) => setSurveys(surveyList), (error) => console.error(`[BitLabs] ${error}`));
  }, []);

  return (
    <FlatList
      data={surveys}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => <SurveyComponent margin={4} value={item.value} />}
      style={[style, { flexGrow: 0, marginVertical: 12 }]}
    />
  )
}

export default SurveyList;