import { FlatList, StyleProp, ViewStyle } from 'react-native'
import React from 'react'
import { getRandomSurveys } from '../utils/helpers'
import Survey from './survey';



const SurveyList = ({ style }: { style?: StyleProp<ViewStyle> }) => {
  const surveys = getRandomSurveys();

  return (
    <FlatList
      data={surveys}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({ }) => <Survey margin={4} />}
      style={[style, { flexGrow: 0, marginVertical: 12 }]}
    />
  )
}

export default SurveyList;