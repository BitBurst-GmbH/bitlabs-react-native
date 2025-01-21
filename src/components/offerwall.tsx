import React, { useEffect, useRef, useState } from 'react';
import {
  BackHandler,
  Image,
  Linking,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import WebView from 'react-native-webview';
import type {
  ShouldStartLoadRequest,
  WebViewMessageEvent,
  WebViewNavigationEvent,
} from 'react-native-webview/lib/WebViewTypes';
import { getAppSettings, leaveSurveys } from '../api/bitlabs_service';
import LeaveSurveyModal from './leave-survey-modal';
import OfferWallStyles from '../styles/offerwall.styles';
import Images from '../assets/images';
import {
  encryptBase64,
  extractColors,
  isColorLuminant,
  buildOfferWallUrl,
} from '../utils';
import Gradient from '../hoc/gradient';
import QRCode from 'react-native-qrcode-svg';
import { HookName, type HookMessage } from '../api/bitlabs_service/types';

type Props = {
  uid: string;
  adId: string;
  token: string;
  isDebugMode?: boolean;
  onReward?: (reward: number) => void;
  onExitPressed: (() => void) | undefined;
  tags: { [key: string]: string | boolean };
};

export default ({
  token,
  uid,
  adId,
  isDebugMode = false,
  onExitPressed,
  onReward = () => {},
  tags = {},
}: Props) => {
  const webview = useRef<WebView>(null); // Reference to the webview component
  const reward = useRef(0.0); // Keep track of the reward collected during the session(Offerwall lifecycle)
  const clickId = useRef(''); // Keep track of the last accessed survey using its clickId(extracted from the URL)
  const onRewardRef = useRef(onReward); // Store onReward to call upon unmount, can't call directly because it's a prop(and may be a state in the parent component)
  const isPageAdGateSupport = useRef(false); // Keep track of whether the non-offerwall page is AdGate Support

  const styles = OfferWallStyles();

  const [errorStr, setErrorStr] = useState(''); // Updated when a webview error occurs
  const [isModalVisible, setIsModalVisible] = useState(false); // Used to show/hide the leave survey modal
  const [canWebViewGoBack, setCanWebViewGoBack] = useState(false); // Used to determine if the webview can go back
  const [isPageOfferwall, setIsPageOfferwall] = useState(true); // Used to determine if the current page is the offerwall
  const [color, setColor] = useState<string[]>(['#007bff', '#007bff']); // Used to determine the navigation (top) bar color
  const [offerwallUrl, setOfferwallUrl] = useState(
    buildOfferWallUrl(token, uid, tags, onExitPressed ? true : false)
  );

  // Hook to update the back button behavior based on the current page
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (isPageOfferwall) {
          if (canWebViewGoBack) {
            webview.current?.goBack();
            return true; // Prevent the back button
          }

          return false; // Do not override the back button if the user is in the offerwall, because it's the root page of the WebView and the user should be able to go back
        }

        if (isPageAdGateSupport.current) {
          webview.current?.injectJavaScript(
            'window.history.go(-(window.history.length - 1));' // Go back to the initial URL
          );

          return true; // Prevent the back button
        }
        setIsModalVisible(true); // Show the leave survey modal
        return true; // Prevent the back button
      }
    );

    return () => backHandler.remove();
  }, [isPageOfferwall, canWebViewGoBack]);

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
  // This is used because onReward is a prop, and can be a state in the parent component
  // Thus it can't be called directly from useEffect functions that run on unmount
  useEffect(() => {
    onRewardRef.current = onReward;
  }, [onReward]);

  // Hook to call onReward when component unmounts
  // It calls onRewardRef because it can't call onReward directly
  useEffect(() => {
    return () => onRewardRef.current(reward.current);
  }, []);

  const leaveCurrentSurvey = (reason = '') => {
    webview.current?.injectJavaScript(
      'window.history.go(-(window.history.length - 1));'
    );

    if (clickId.current.length > 0) {
      console.log(`Leaving with reason ~> ${reason}`);
      leaveSurveys(token, uid, clickId.current, reason)
        .then((successMsg) => console.log(successMsg))
        .catch((errorMsg) => console.log(errorMsg));
      clickId.current = '';
    }
  };

  const onMessage = (event: WebViewMessageEvent) => {
    const message: HookMessage = JSON.parse(event.nativeEvent.data);

    if (message.type !== 'hook') {
      return;
    }

    switch (message.name) {
      case HookName.init:
        webview.current?.injectJavaScript(`
          window.parent.postMessage({ target: 'app.behaviour.close_button_visible', value: true }, '*');
        `);
        console.debug('Sent message to show close button.');
        break;

      case HookName.SurveyStart:
        clickId.current = message.args[0].clickId;
        console.debug(`Survey ${clickId.current} started.`);
        break;

      case HookName.SurveyStartBonus:
        const bonus = message.args[0].reward;
        reward.current += bonus;
        console.debug(`Started survey with bonus ${bonus}`);
        break;

      case HookName.SurveyComplete:
        const payout = message.args[0].reward;
        reward.current += payout;
        console.debug(`Completed survey with reward ${payout}`);
        break;

      case HookName.SurveyScreenout:
        const compensation = message.args[0].reward;
        reward.current += compensation;
        console.debug(
          `Screened out of survey with compensation ${compensation}`
        );
        break;

      case HookName.SdkClose:
        onExitPressed?.();
        break;

      default:
        break;
    }
  };

  const onLoadStart = ({ nativeEvent }: WebViewNavigationEvent) => {
    const url = nativeEvent.url;
    setIsPageOfferwall(url.startsWith('https://web.bitlabs.ai'));

    isPageAdGateSupport.current = false; // Assume the page is not AdGate Support

    const adGateUrlRegex =
      /^https:\/\/wall\.adgaterewards?.com\/(.*\/)*contact/;

    isPageAdGateSupport.current = adGateUrlRegex.test(url); // The page is AdGate Support
  };

  const onLoad = (event: WebViewNavigationEvent) => {
    setCanWebViewGoBack(event.nativeEvent.canGoBack);
  };

  const onShouldStartLoadingWithRequest = ({ url }: ShouldStartLoadRequest) => {
    if (url.includes('/offers/')) {
      Linking.openURL(url);
      return false;
    }
    return true;
  };

  const onError = () => {
    if (!isDebugMode) {
      return;
    }

    const errStr = `{ uid: ${uid}, date: ${Date.now()} }`;
    setErrorStr(encryptBase64(errStr));
  };

  const disableZoom = `
    var meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    document.getElementsByTagName('head')[0].appendChild(meta);
  `;

  const postMessageListenerScript = `
    if(!window.isEventListenerAdded) { // Important to add event listener only once regardless of the number of times the script is injected   
      window.addEventListener('message', (event) => { 
        window.ReactNativeWebView.postMessage(JSON.stringify(event.data));
      });

      window.isEventListenerAdded = true; // Set flag to true to prevent adding the event listener again
    }
    true;
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
                    ? webview.current?.injectJavaScript(
                        'window.history.go(-(window.history.length - 1));' // Go back to the initial URL
                      )
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
          ref={webview}
          onError={onError}
          style={styles.webview}
          scalesPageToFit={false}
          javaScriptEnabled={true}
          onLoadStart={onLoadStart}
          onLoad={onLoad}
          onMessage={onMessage}
          source={{ uri: offerwallUrl }}
          bounces={false}
          overScrollMode="never"
          injectedJavaScript={disableZoom + postMessageListenerScript}
          onShouldStartLoadWithRequest={onShouldStartLoadingWithRequest}
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
