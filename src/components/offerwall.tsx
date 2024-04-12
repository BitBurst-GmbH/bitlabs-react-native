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
  const reward = useRef(0.0); // Keep track of the reward collected during the session
  const clickId = useRef(''); // Keep track of the last accessed survey using its clickId
  const onRewardRef = useRef(onReward); // Store onReward to call upon unmount, can't call directly because it's a prop
  const isPageAdGateSupport = useRef(false); // Keep track of whether the non-offerwall page is AdGate Support

  const styles = OfferWallStyles();

  const [errorStr, setErrorStr] = useState(''); // Updated when a webview error occurs
  const [webviewKey, setWebviewKey] = useState(0); // Used to reset the webview to go back to the offerwall
  const [isModalVisible, setIsModalVisible] = useState(false); // Used to show/hide the leave survey modal
  const [isPageOfferwall, setIsPageOfferwall] = useState(true); // Used to determine if the current page is the offerwall
  const [areParamsLoaded, setAreParamsLoaded] = useState(true); // Used to determine if the session params are loaded in the URL
  const [color, setColor] = useState<string[]>(['#007bff', '#007bff']); // Used to determine the navigation (top) bar color
  const [offerwallUrl, setOfferwallUrl] = useState(
    buildOfferWallUrl(token, uid, tags ?? {}, onExitPressed ? true : false)
  );

  // Hook to add event listener which accepts a state value
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (isPageOfferwall) {
          return false; // Do not override the back button if the user is in the offerwall, because it's the root page of the WebView and the user should be able to go back
        }

        if (isPageAdGateSupport.current) {
          setWebviewKey((oldKey) => (oldKey + 1) % 2); // Reload the webview to go back to the offerwall
          return true; // Prevent the back button
        }
        setIsModalVisible(true); // Show the leave survey modal
        return true; // Prevent the back button
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

  const leaveCurrentSurvey = (reason = '') => {
    setWebviewKey((oldKey) => (oldKey + 1) % 2);
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

    isPageAdGateSupport.current = false; // Assume the page is not AdGate Support

    // If the page is the offerwall
    if (isOfferwall) {
      if (
        // If we came back from a survey, collect the reward
        url.includes('survey-compete') ||
        url.includes('survey-screenout') ||
        url.includes('start-bonus')
      ) {
        reward.current += extractValue(url);
      }

      // If session params are not loaded, load them into a new URL
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
    } else {
      // If the page is not the offerwall
      // Check if the URL has a clickId and extract it, if not, keep the current one
      clickId.current = extractClickId(url) ?? clickId.current;
      // Params are indeed not loaded, because they load in the Offerwall URL only
      setAreParamsLoaded(false);

      if (url.startsWith('https://wall.adgaterewards.com/contact/')) {
        isPageAdGateSupport.current = true; // The page is AdGate Support
      }
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
          leaveSurveyHandler={leaveCurrentSurvey}
        />
        {!isPageOfferwall && (
          <Gradient style={{ height: 50 }} colors={color}>
            <View style={styles.headerView}>
              <TouchableOpacity
                onPress={() =>
                  isPageAdGateSupport.current
                    ? setWebviewKey((oldKey) => (oldKey + 1) % 2)
                    : setIsModalVisible(true)
                }
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
          style={styles.webview}
          scalesPageToFit={false}
          javaScriptEnabled={true}
          onLoadStart={onLoadStart}
          source={{ uri: offerwallUrl }}
          bounces={false}
          overScrollMode="never"
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
