import React, { useEffect, useRef, useState } from 'react';
import {
  BackHandler,
  Image,
  Linking,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  Platform,
} from 'react-native';
import WebView from 'react-native-webview';
import type {
  ShouldStartLoadRequest,
  WebViewNativeEvent,
  WebViewNavigationEvent,
} from 'react-native-webview/lib/WebViewTypes';
import { getAppSettings, leaveSurveys } from '../api/bitlabs_repository';
import LeaveSurveyModal from './leave-survey-modal';
import OfferWallStyles from '../styles/offerwall.styles';
import Images from '../assets/images';
import {
  encryptBase64,
  extractColors,
  isColorLuminant,
  buildOfferWallUrl,
} from '../utils/helpers';
import Gradient from '../hoc/gradient';
import QRCode from 'react-native-qrcode-svg';

type Props = {
  uid: string;
  adId: string;
  token: string;
  onExitPressed: (() => void) | undefined;
  tags?: { [key: string]: string | boolean };
  onReward: (reward: number) => void;
};

export default ({ token, uid, adId, onExitPressed, onReward, tags }: Props) => {
  const reward = useRef(0.0);
  const clickId = useRef('');
  const onRewardRef = useRef(onReward);

  const styles = OfferWallStyles();
  const [webviewKey, setWebviewKey] = useState(0);
  const [errorStr, setErrorStr] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPageOfferwall, setIsPageOfferwall] = useState(true);
  const [areParamsLoaded, setAreParamsLoaded] = useState(true);
  const [color, setColor] = useState<string[]>(['#007bff', '#007bff']);
  const [offerwallUrl, setOfferwallUrl] = useState(
    buildOfferWallUrl(token, uid, tags ?? {}, onExitPressed ? true : false)
  );

  // Hook to add event listener which accepts a state value
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (isPageOfferwall) {
          return false;
        }

        setIsModalVisible(true);
        return true;
      }
    );

    return () => backHandler.remove();
  }, [isPageOfferwall]);

  // Hook to add adId if one is given
  useEffect(() => {
    if (adId) {
      setOfferwallUrl((o) => o + `&maid=${adId}`);
    }
  }, [adId]);

  // Hook to get navigation color
  useEffect(() => {
    getAppSettings(token, uid, (_, navigationColor) =>
      setColor(extractColors(navigationColor) ?? ['#007bff', '#007bff'])
    ).catch((error) => console.error(error));
  }, [token, uid]);

  // Hook to update onRewardRef when onReward changes
  useEffect(() => {
    onRewardRef.current = onReward;
  }, [onReward]);

  // Hook to call onReward when component unmounts
  useEffect(() => {
    return () => onRewardRef.current(reward.current);
  }, []);

  const onBackPressed = (reason = '') => {
    setWebviewKey((webviewKey + 1) % 2);
    if (clickId.current.length > 0) {
      console.log(`Leaving with reason ~> ${reason}`);
      leaveSurveys(token, uid, clickId.current, reason)
        .then((successMsg) => console.log(successMsg))
        .catch((errorMsg) => console.log(errorMsg));
      clickId.current = '';
    }
  };

  const onLoadStart = ({ nativeEvent }: WebViewNavigationEvent) => {
    const url = nativeEvent.url;
    const isOfferwall = url.startsWith('https://web.bitlabs.ai');
    setIsPageOfferwall(isOfferwall);

    if (isOfferwall) {
      if (
        url.includes('survey-compete') ||
        url.includes('survey-screenout') ||
        url.includes('start-bonus')
      ) {
        reward.current += extractValue(url);
      }

      if (!areParamsLoaded && !url.includes('sdk=REACT')) {
        setAreParamsLoaded(true);
        let newURL =
          url + `&uid=${uid}&token=${token}&os=${Platform.OS}&sdk=REACT`;
        if (adId) {
          newURL += `&maid=${adId}`;
        }
        if (tags) {
          Object.keys(tags).forEach((key) => {
            newURL += `&${key}=${tags[key]}`;
          });
        }

        console.log('Calling url: ' + newURL);
        setOfferwallUrl(newURL);
      }
    }

    if (!isOfferwall) {
      clickId.current = extractClickId(url) ?? clickId.current;
      setAreParamsLoaded(false);
    }
  };

  const closeDetector = (nativeEvent: WebViewNativeEvent) => {
    const url = nativeEvent.url;
    if (url.endsWith('/close')) {
      onExitPressed?.();
    }
  };

  const onShouldStartLoadingWithRequest = ({ url }: ShouldStartLoadRequest) => {
    if (url.includes('/offers/')) {
      Linking.openURL(url);
      return false;
    }
    return true;
  };

  const onError = () => {
    const errStr = `{ uid: ${uid}, date: ${Date.now()} }`;
    setErrorStr(encryptBase64(errStr));
  };

  const disableZoom = `
        var meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
        document.getElementsByTagName('head')[0].appendChild(meta);
    `;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{ flex: 1, justifyContent: 'center', alignItems: 'stretch' }}
      >
        <LeaveSurveyModal
          visible={isModalVisible}
          setIsVisible={setIsModalVisible}
          leaveSurveyHandler={onBackPressed}
        />
        {!isPageOfferwall && (
          <Gradient style={{ height: 50 }} colors={color}>
            <View style={styles.headerView}>
              <TouchableOpacity
                onPress={() => setIsModalVisible(true)}
                style={styles.chevronTouchable}
              >
                <Image
                  source={Images.circleChevronLeftRegular}
                  style={[
                    styles.image,
                    { tintColor: isColorLuminant(color) ? 'black' : 'white' },
                  ]}
                />
              </TouchableOpacity>
            </View>
          </Gradient>
        )}
        <WebView
          testID="Webview"
          key={webviewKey}
          onError={onError}
          source={{ uri: offerwallUrl }}
          style={styles.webview}
          scalesPageToFit={false}
          javaScriptEnabled={true}
          onLoadStart={onLoadStart}
          injectedJavaScript={disableZoom}
          onLoadEnd={({ nativeEvent }) => closeDetector(nativeEvent)}
          onShouldStartLoadWithRequest={onShouldStartLoadingWithRequest}
          onLoadProgress={({ nativeEvent }) => closeDetector(nativeEvent)}
        />
      </View>
      {errorStr.length > 0 && (
        <View style={styles.errorView}>
          <QRCode size={50} value={errorStr} />
          <Text
            style={{ marginHorizontal: 4, flexShrink: 1 }}
          >{`Error ID:\n${errorStr}`}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const extractValue = (url: string) => {
  if (!url.includes('&val=')) {
    return 0.0;
  }

  const params = url.split(/([?,=,&])/);
  const index = params.indexOf('val');
  const value = params[index + 2];

  return parseFloat(value ?? '0');
};

const extractClickId = (url: string) => {
  if (!url.startsWith('https://redirect.bitlabs.ai/')) {
    return null;
  }

  const params = url.split(/([?,=,&])/);
  const index = params.indexOf('clk');
  const clk = params[index + 2];

  if (!clk) {
    return null;
  }

  return clk;
};
