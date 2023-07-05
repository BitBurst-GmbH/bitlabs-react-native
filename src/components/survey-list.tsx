import { FlatList, type StyleProp, type ViewStyle } from 'react-native'
import React, { useEffect, useState } from 'react'
import SimpleWidget from './simple-survey';
import CompactWidget from './compact-survey';
import type { Survey } from '../api/bitlabs_repository.types';
import { getAppSettings, getIsImageSVG, getSurveysRepo } from '../api/bitlabs_repository';
import { WidgetType } from '../api/widget-type';
import FullWidthWidget from './fullwidth-survey';
import { extractColors } from '../utils/helpers';
import Gradient from '../hoc/gradient';
import { CurrencyIcon } from '../hoc/currency-icon';

type Props = {
  uid: string,
  token: string,
  type: WidgetType,
  onSurveyPressed: () => void,
  style?: StyleProp<ViewStyle>,
}

const SurveyList = ({ uid, token, style, type, onSurveyPressed }: Props) => {
  const [surveys, setSurveys] = useState<Survey[]>([])
  const [currency, setCurrency] = useState<React.JSX.Element>();
  const [oldCurrency, setOldCurrency] = useState<React.JSX.Element>();
  const [color, setColor] = useState<String[]>(['#007bff', '#007bff']);

  useEffect(() => {
    getSurveysRepo(token, uid, (surveyList) => setSurveys(surveyList), (error) => console.error(`[BitLabs] ${error}`));
    getAppSettings(token, uid, (color, _2, _3, url) => {
      setColor(extractColors(color));

      if (url) getIsImageSVG(url, (isSVG) => {
        var size = getDimension(type);
        setCurrency(<CurrencyIcon isSVG={isSVG} url={url} size={size} />);
        setOldCurrency(<CurrencyIcon isSVG={isSVG} url={url} size={size * .7} />);
      });
    });

  }, []);

  return (
    <FlatList
      data={surveys}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <Gradient style={getStyle(type)} colors={color} rectRadius={5} >
          {getWidget(type, color, onSurveyPressed, item, currency, oldCurrency)}
        </Gradient>)}
      style={[style, { flexGrow: 0, marginVertical: 12 }]}
    />
  )
}

const getDimension = (type: WidgetType) => {
  switch (type) {
    case WidgetType.Simple:
      return 20;
    case WidgetType.Compact:
      return 15;
    case WidgetType.FullWidth:
      return 15;
  }
}

const getStyle = (type: WidgetType) => {
  switch (type) {
    case WidgetType.Simple:
      return { width: 290, height: 130, margin: 4, };
    case WidgetType.Compact:
      return { width: 300, height: 80, margin: 4, };
    case WidgetType.FullWidth:
      return { width: 500, height: 50, margin: 4, };
  }
};

const getWidget = (type: WidgetType, colors: String[], onPress: () => void, survey: Survey, currency?: React.JSX.Element, oldCurrency?: React.JSX.Element) => {
  switch (type) {
    case WidgetType.Simple:
      return (<SimpleWidget onPress={onPress} survey={survey} color={colors[0]!.toString()} currency={currency} oldCurrency={oldCurrency} />);
    case WidgetType.Compact:
      return (<CompactWidget colors={colors.map(s => s.toString())} onPress={onPress} survey={survey} currency={currency} oldCurrency={oldCurrency} />);
    case WidgetType.FullWidth:
      return (<FullWidthWidget color={colors[0]!.toString()} onPress={onPress} survey={survey} currency={currency} oldCurrency={oldCurrency} />);

  }
}

export default SurveyList;