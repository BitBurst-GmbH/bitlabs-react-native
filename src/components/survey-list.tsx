import { FlatList, StyleProp, ViewStyle } from 'react-native'
import React, { useEffect, useState } from 'react'
import SimpleWidget from './simple-survey';
import CompactWidget from './compact-survey';
import type { Survey } from '../api/bitlabs_repository.types';
import { getAppSettingsRepo, getSurveysRepo } from '../api/bitlabs_repository';
import { WidgetType } from '../api/widget-type';

type Props = {
  uid: string,
  token: string,
  onSurveyPressed: () => void,
  style?: StyleProp<ViewStyle>,
}

const SurveyList = ({ uid, token, style, onSurveyPressed }: Props) => {
  const [surveys, setSurveys] = useState<Survey[]>([])
  const [color, setColor] = useState('#007bff');

  useEffect(() => {
    getSurveysRepo(token, uid, (surveyList) => setSurveys(surveyList), (error) => console.error(`[BitLabs] ${error}`));
    getAppSettingsRepo(token, uid, (color) => setColor(color));
  }, []);

  return (
    <FlatList
      data={surveys}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => getWidget(WidgetType.Simple, color, onSurveyPressed, item)}
      style={[style, { flexGrow: 0, marginVertical: 12 }]}
    />
  )
}

const getWidget = (type: WidgetType, color: string, onPress: () => void, survey: Survey) => {
  switch (type) {
    case WidgetType.Simple:
      return (<SimpleWidget color={color} onPress={onPress} margin={4} survey={survey} />);

    case WidgetType.Compact:
    default:
      return (<CompactWidget color={color} onPress={onPress} margin={4} survey={survey} />);
  }
}

export default SurveyList;