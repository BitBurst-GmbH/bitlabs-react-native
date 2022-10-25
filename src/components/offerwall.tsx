import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import WebView from 'react-native-webview';
import type { WebViewNavigationEvent } from 'react-native-webview/lib/WebViewTypes';
import { LeaveSurveyModal } from './leave-survey-modal';

type Props = { token: string, uid: string, onReward: (reward: number) => void, onExitPressed: () => void }

export const BitLabsOfferWall = ({ token, uid, onExitPressed }: Props) => {
    let reward = 0.0;
    let surveyId: string = '';
    let networkId: string = '';

    const [key, setKey] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isPageOfferwall, setIsPageOfferwall] = useState(false);
    const url = `https://web.bitlabs.ai?token=${token}&uid=${uid}`;

    const onBackPressed = () => setKey((key + 1) % 2);

    const onLoadProgress = ({ nativeEvent }: WebViewNavigationEvent) => {
        const url = nativeEvent.url;
        setIsPageOfferwall(url.startsWith('https://web.bitlabs.ai'));

        if (url.includes('survey/complete') || url.includes('survey/screenout')) {
            reward += extractValue(url);
        } else {
            const [idNetwork, idSurvey] = extractNetworkIdAndSurveyId(url);
            networkId = idNetwork ?? networkId;
            surveyId = idSurvey ?? surveyId;
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'stretch' }}>
            <LeaveSurveyModal visible={isModalVisible} setIsVisible={setIsModalVisible} leaveSurveHandler={onBackPressed} />
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

const styles = StyleSheet.create({
    webview: { flex: 1, },
    headerView: {
        height: 50,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'black',
    },
    chevronTouchable: {
        marginHorizontal: 14,
    },
    xmarkTouchable: {
        top: 16,
        right: 16,
        position: 'absolute',
    },
    image: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    }
});