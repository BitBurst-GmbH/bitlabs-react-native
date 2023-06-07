import { FlatList, type StyleProp, type ViewStyle } from 'react-native'
import React, { useEffect, useState } from 'react'
import SimpleWidget from './simple-survey';
import CompactWidget from './compact-survey';
import type { Survey } from '../api/bitlabs_repository.types';
import { getAppSettingsRepo, getSurveysRepo } from '../api/bitlabs_repository';
import { WidgetType } from '../api/widget-type';
import FullWidthWidget from './fullwidth-survey';
import { extractColors } from '../utils/helpers';

type Props = {
  uid: string,
  token: string,
  onSurveyPressed: () => void,
  style?: StyleProp<ViewStyle>,
}

const SurveyList = ({ uid, token, style, onSurveyPressed }: Props) => {
  const [surveys, setSurveys] = useState<Survey[]>([])
  const [color, setColor] = useState<String[]>(['#007bff', '#007bff']);

  useEffect(() => {
    getSurveysRepo(token, uid, (surveyList) => setSurveys(surveyList), (error) => console.error(`[BitLabs] ${error}`));
    getAppSettingsRepo(token, uid, (color) => setColor(extractColors(color)));
  }, []);

  return (
    <FlatList
      data={surveys}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => getWidget(WidgetType.FullWidth, color, onSurveyPressed, item)}
      style={[style, { flexGrow: 0, marginVertical: 12 }]}
    />
  )
}

const getWidget = (type: WidgetType, color: String[], onPress: () => void, survey: Survey) => {
  switch (type) {
    case WidgetType.Simple:
      return (<SimpleWidget color={color[0]?.toString()} onPress={onPress} margin={4} survey={survey} />);
    case WidgetType.Compact:
      return (<CompactWidget color={color[1]?.toString()} onPress={onPress} margin={4} survey={survey} />);
    case WidgetType.FullWidth:
      return (<FullWidthWidget colors={color} onPress={onPress} margin={4} survey={survey} />);

  }
}

export default SurveyList;