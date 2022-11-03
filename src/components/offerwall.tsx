import React, { useEffect, useRef, useState } from 'react';
import { BackHandler, Image, Linking, NativeEventSubscription, Platform, TouchableOpacity, View } from 'react-native';
import WebView from 'react-native-webview';
import type { ShouldStartLoadRequest, WebViewNavigationEvent } from 'react-native-webview/lib/WebViewTypes';
import { getHasOffers, leaveSurveys } from '../api/bitlabs_repository';
import { LeaveSurveyModal } from './leave-survey-modal';
import styles from './offerwall.styles';
import ReactNativeIdfaAaid, { AdvertisingInfoResponse } from '@sparkfabrik/react-native-idfa-aaid';

type Props = {
    uid: string,
    token: string,
    onExitPressed: () => void,
    tags?: { [key: string]: string },
    onReward: (reward: number) => void,
}

export const BitLabsOfferWall = ({ token, uid, onExitPressed, onReward, tags }: Props) => {
    let reward = useRef(0.0);
    let surveyId = useRef('');
    let networkId = useRef('');
    const queries = Object.entries(tags ?? {})
        .map(([key, value]) => `${key}=${value}`)
        .join('&');

    const [key, setKey] = useState(0);
    const [hasOffers, setHasOffers] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isPageOfferwall, setIsPageOfferwall] = useState(true);
    const [url, setUrl] = useState(`https://web.bitlabs.ai?token=${token}&uid=${uid}&${queries}`);

    let backHandler: NativeEventSubscription;

    // Hook to open in external browser if on ios and has Offers
    useEffect(() => {
        if (hasOffers && Platform.OS === 'ios') {
            onExitPressed();
            Linking.openURL(url);
        }
    }, [hasOffers]);

    // Hook to add event listener which accepts a state value
    useEffect(() => {
        backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            if (isPageOfferwall) return false;

            setIsModalVisible(true);
            return true;
        });

        return () => backHandler.remove();
    }, [isPageOfferwall]);

    // Mount/Unmount hook
    useEffect(() => {
        getHasOffers(token, uid).then((hasOffers) => setHasOffers(hasOffers));

        ReactNativeIdfaAaid.getAdvertisingInfo().then((res: AdvertisingInfoResponse) =>
            !res.isAdTrackingLimited && setUrl(url + `&maid=${res.id!}`));

        return () => {
            backHandler.remove();
            onReward(reward.current);
        }
    }, []);

    const onBackPressed = (reason: string = '') => {
        setKey((key + 1) % 2);
        if (networkId.current.length > 0 && surveyId.current.length > 0) {
            console.log(`Leaving with reason ~> ${reason}`);
            leaveSurveys(token, uid, networkId.current, surveyId.current, reason);
            networkId.current = '';
            surveyId.current = '';
        }
    }

    const onLoadProgress = ({ nativeEvent }: WebViewNavigationEvent) => {
        const url = nativeEvent.url;
        setIsPageOfferwall(url.startsWith('https://web.bitlabs.ai'));

        if (url.includes('survey/complete') || url.includes('survey/screenout')) {
            reward.current += extractValue(url);
        } else {
            const [idNetwork, idSurvey] = extractNetworkIdAndSurveyId(url);
            networkId.current = idNetwork ?? networkId.current;
            surveyId.current = idSurvey ?? surveyId.current;
        }
    }

    const onShouldStartLoadingWithRequest = ({ url }: ShouldStartLoadRequest) => {
        if (/offers\/.+\/open/.test(url)) {
            Linking.openURL(url);
            return false;
        }
        return true;
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'stretch' }}>
            <LeaveSurveyModal
                visible={isModalVisible}
                setIsVisible={setIsModalVisible}
                leaveSurveHandler={onBackPressed} />
            {!isPageOfferwall && (
                <View style={styles.headerView}>
                    <TouchableOpacity onPress={() => setIsModalVisible(true)} style={styles.chevronTouchable}>
                        <Image source={require('../assets/circle-chevron-left-regular.png')} style={styles.image} />
                    </TouchableOpacity>
                </View>
            )}
            <WebView
                key={key}
                javaScriptEnabled={true}
                onLoadStart={onLoadProgress}
                source={{ uri: url }} style={styles.webview}
                onShouldStartLoadWithRequest={onShouldStartLoadingWithRequest} />
            {isPageOfferwall && (
                <TouchableOpacity onPress={onExitPressed} style={styles.xmarkTouchable}>
                    <Image source={require('../assets/circle-xmark-regular.png')} style={styles.image} />
                </TouchableOpacity>
            )}
        </View>
    );
}

const extractValue = (url: string) => {
    if (!url.includes('&val=')) return 0.0;

    const params = url.split(/([?,=,&])/);
    const index = params.indexOf('val');
    const value = params[index + 2];

    return parseFloat(value ?? '0');
}

const extractNetworkIdAndSurveyId = (url: string) => {
    if (!url.startsWith('https://redirect.bitlabs.ai/'))
        return [null, null];

    const params = url.split(/([?,=,&])/);
    let index = params.indexOf('network');
    const networkId = params[index + 2];
    index = params.indexOf('survey');
    const surveyId = params[index + 2];

    if (!networkId || !surveyId)
        return [null, null];

    return [networkId, surveyId];
}