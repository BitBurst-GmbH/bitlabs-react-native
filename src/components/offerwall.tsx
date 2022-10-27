import React, { useEffect, useRef, useState } from 'react';
import { BackHandler, Image, NativeEventSubscription, TouchableOpacity, View } from 'react-native';
import WebView from 'react-native-webview';
import type { WebViewNavigationEvent } from 'react-native-webview/lib/WebViewTypes';
import { leaveSurveys } from '../api/bitlabs_repository';
import { LeaveSurveyModal } from './leave-survey-modal';
import styles from './offerwall.styles';

type Props = { token: string, uid: string, onReward: (reward: number) => void, onExitPressed: () => void }

export const BitLabsOfferWall = ({ token, uid, onExitPressed, onReward }: Props) => {
    let reward = useRef(0.0);
    let surveyId = useRef('');
    let networkId = useRef('');

    const [key, setKey] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isPageOfferwall, setIsPageOfferwall] = useState(true);
    const url = `https://web.bitlabs.ai?token=${token}&uid=${uid}`;

    let backHandler: NativeEventSubscription;

    // Hook to add event listener which accepts a state value
    useEffect(() => {
        backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            if (isPageOfferwall) return false;

            setIsModalVisible(true);
            return true;
        });

        return () => backHandler.remove();
    }, [isPageOfferwall]);

    // Cleanup state
    useEffect(() => () => {
        backHandler.remove();
        onReward(reward.current);
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
                source={{ uri: url }} style={styles.webview}
                javaScriptEnabled={true}
                onLoadStart={onLoadProgress} />
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