import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import WebView from 'react-native-webview';
import type { WebViewNavigationEvent } from 'react-native-webview/lib/WebViewTypes';

type Props = { token: string, uid: string, onReward: (reward: number) => void, onExitPressed: () => void }

export const BitLabsOfferWall = ({ token, uid, onExitPressed }: Props) => {
    let reward = 0.0;
    const [key, setKey] = useState(0);
    const [isPageOfferwall, setIsPageOfferwall] = useState(true);
    const url = `https://web.bitlabs.ai?token=${token}&uid=${uid}`;

    const onBackPressed = () => setKey((key + 1) % 2);

    const onLoadProgress = ({ nativeEvent }: WebViewNavigationEvent) => {
        const url = nativeEvent.url;
        console.log(url);
        setIsPageOfferwall(url.startsWith('https://web.bitlabs.ai'));

        if (isPageOfferwall) return;

        if (url.includes('survey/complete') || url.includes('survey/screenout')) {
            reward += extractValue(url);
        }

    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
            {!isPageOfferwall && (
                <View style={styles.headerView}>
                    <TouchableOpacity onPress={onBackPressed} style={styles.chevronTouchable}>
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

    const params = url.split(/([?,=,&])/)
    const index = params.indexOf('val')
    const value = params[index + 2]

    return parseFloat(value ?? '0');
}

const styles = StyleSheet.create({
    webview: { flex: 1 },
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