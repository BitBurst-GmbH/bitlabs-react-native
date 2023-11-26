import { FlatList, type StyleProp, type ViewStyle } from 'react-native'
import React, { useEffect, useState } from 'react'
import SimpleWidget from './simple-survey';
import CompactWidget from './compact-survey';
import { type Survey, type SurveyProperties, WidgetType } from '../api/types';
import { getAppSettings, getIsImageSVG, getSurveysRepo } from '../api/bitlabs_repository';
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
  const [bonusPercentage, setBonusPercentage] = useState(0);
  const [color, setColor] = useState(['#007bff', '#007bff']);
  const [currencyString, setCurrencyString] = useState<string>('');
  const [currencyIcon, setCurrencyIcon] = useState<React.JSX.Element>();
  const [oldCurrencyIcon, setOldCurrencyIcon] = useState<React.JSX.Element>();

  useEffect(() => {
    getSurveysRepo(token, uid, (surveyList) => setSurveys(surveyList), (error) => console.error(`[BitLabs] ${error}`));
    getAppSettings(token, uid, (color, _2, _3, bonusPercentage, currencySymbol) => {
      const [isImage, content] = currencySymbol;

      if (isImage) getIsImageSVG(content, (isSVG) => {
        var size = getDimension(type);
        setCurrencyIcon(<CurrencyIcon isSVG={isSVG} url={content} size={size} />);
        setOldCurrencyIcon(<CurrencyIcon isSVG={isSVG} url={content} size={size * .7} />);
      });
      else setCurrencyString(content);

      setColor(extractColors(color) ?? ['#007bff', '#007bff']);
      setBonusPercentage(bonusPercentage);
    });

  }, []);

  return (
    <FlatList
      data={surveys}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <Gradient style={getStyle(type)} colors={color} rectRadius={5} >
          {getWidget(type, item, {
            colors: color,
            onPress: onSurveyPressed,
            currencyIcon: currencyIcon,
            oldCurrency: oldCurrencyIcon,
            currencyString: currencyString,
            bonusPercentage: bonusPercentage,
          })}
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

const getWidget = (type: WidgetType, survey: Survey, properties: SurveyProperties) => {
  switch (type) {
    case WidgetType.Simple:
      return (<SimpleWidget survey={survey} properties={properties} />);
    case WidgetType.Compact:
      return (<CompactWidget survey={survey} properties={properties} />);
    case WidgetType.FullWidth:
      return (<FullWidthWidget survey={survey} properties={properties} />);

  }
}

export default SurveyList;