import { FlatList, type StyleProp, type ViewStyle } from 'react-native'
import React, { useEffect, useState } from 'react'
import SimpleWidget from './simple-survey';
import CompactWidget from './compact-survey';
import type { Survey } from '../api/bitlabs_repository.types';
import { getAppSettings, getSurveysRepo } from '../api/bitlabs_repository';
import { WidgetType } from '../api/widget-type';
import FullWidthWidget from './fullwidth-survey';
import { extractColors } from '../utils/helpers';
import Gradient from './gradient';

type Props = {
  uid: string,
  token: string,
  type: WidgetType,
  onSurveyPressed: () => void,
  style?: StyleProp<ViewStyle>,
}

const SurveyList = ({ uid, token, style, type, onSurveyPressed }: Props) => {
  const [surveys, setSurveys] = useState<Survey[]>([])
  const [color, setColor] = useState<String[]>(['#007bff', '#007bff']);

  useEffect(() => {
    getSurveysRepo(token, uid, (surveyList) => setSurveys(surveyList), (error) => console.error(`[BitLabs] ${error}`));
    getAppSettings(token, uid, (color) => setColor(extractColors(color)));
  }, []);

  return (
    <FlatList
      data={surveys}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <Gradient style={getStyle(type)} colors={color} rectRadius={5} >
          {getWidget(type, color, onSurveyPressed, item)}
        </Gradient>)}
      style={[style, { flexGrow: 0, marginVertical: 12 }]}
    />
  )
}

const getStyle = (type: WidgetType) => {
  switch (type) {
    case WidgetType.Simple:
      return { width: 290, height: 130, margin: 4, };
    case WidgetType.Compact:
      return { width: 300, height: 80, margin: 4, };
    case WidgetType.FullWidth:
      return { width: 450, height: 50, margin: 4, };
  }
};

const getWidget = (type: WidgetType, colors: String[], onPress: () => void, survey: Survey) => {
  switch (type) {
    case WidgetType.Simple:
      return (<SimpleWidget onPress={onPress} survey={survey} color={colors[0]!.toString()} />);
    case WidgetType.Compact:
      return (<CompactWidget colors={colors.map(s => s.toString())} onPress={onPress} survey={survey} />);
    case WidgetType.FullWidth:
      return (<FullWidthWidget color={colors[0]!.toString()} onPress={onPress} survey={survey} />);

  }
}

export default SurveyList;