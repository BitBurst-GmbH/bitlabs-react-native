import React, { useEffect, useRef, useState } from 'react';
import { Appearance, BackHandler, Image, Linking, type NativeEventSubscription, Platform, SafeAreaView, TouchableOpacity, View } from 'react-native';
import WebView from 'react-native-webview';
import type { ShouldStartLoadRequest, WebViewNavigationEvent } from 'react-native-webview/lib/WebViewTypes';
import { getAppSettingsRepo, getHasOffersRepo, leaveSurveysRepo } from '../api/bitlabs_repository';
import LeaveSurveyModal from './leave-survey-modal';
import OfferWallStyles from '../styles/offerwall.styles';
import Images from '../assets/images';
import { extractColors, isColorLuminant } from '../utils/helpers';
import Gradient from './gradient';

type Props = {
    uid: string,
    adId: string,
    token: string,
    onExitPressed: () => void,
    tags?: { [key: string]: string | boolean },
    onReward: (reward: number) => void,
}

const OfferWall = ({ token, uid, adId, onExitPressed, onReward, tags }: Props) => {
    let backHandler: NativeEventSubscription;

    let reward = useRef(0.0);
    let clickId = useRef('');

    const styles = OfferWallStyles();
    const queries = Object.entries(tags ?? {}).map(([key, value]) => `&${key}=${value}`);

    const [key, setKey] = useState(0);
    const [color, setColor] = useState<String[]>(['#007bff', '#007bff']);
    const [hasOffers, setHasOffers] = useState(false);
    const [isOffersEnabled, setIsOffersEnabled] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isPageOfferwall, setIsPageOfferwall] = useState(true);
    const [url, setUrl] = useState(`https://web.bitlabs.ai?token=${token}&uid=${uid}${queries}`);


    // Hook to open in external browser if on ios and has Offers
    useEffect(() => {
        if (isOffersEnabled && hasOffers && Platform.OS === 'ios') {
            onExitPressed();
            Linking.openURL(url);
        }
    }, [isOffersEnabled, hasOffers]);

    // Hook to add event listener which accepts a state value
    useEffect(() => {
        backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            if (isPageOfferwall) return false;

            setIsModalVisible(true);
            return true;
        });

        return () => backHandler.remove();
    }, [isPageOfferwall]);

    // Hook to add adId if one is given
    useEffect(() => { if (adId) setUrl(url + `&maid=${adId}`); }, [adId]);

    // Mount/Unmount hook
    useEffect(() => {
        getHasOffersRepo(token, uid).then((hasOffers) => setHasOffers(hasOffers));
        getAppSettingsRepo(token, uid, (_, navigationColor, isOffersEnabled) => {
            setColor(extractColors(navigationColor));
            setIsOffersEnabled(isOffersEnabled);
        });

        return () => {
            backHandler.remove();
            onReward(reward.current);
        }
    }, []);

    const onBackPressed = (reason: string = '') => {
        setKey((key + 1) % 2);
        if (clickId.current.length > 0) {
            console.log(`Leaving with reason ~> ${reason}`);
            leaveSurveysRepo(token, uid, clickId.current, reason);
            clickId.current = '';
        }
    }

    const onLoadProgress = ({ nativeEvent }: WebViewNavigationEvent) => {
        const url = nativeEvent.url;
        setIsPageOfferwall(url.startsWith('https://web.bitlabs.ai'));

        if (url.includes('survey-compete') || url.includes('survey-screenout') || url.includes('start-bonus')) {
            reward.current += extractValue(url);
        } else {
            clickId.current = extractClickId(url) ?? clickId.current;
        }
    }

    const onShouldStartLoadingWithRequest = ({ url }: ShouldStartLoadRequest) => {
        if (/offers\/.+\/open/.test(url)) {
            Linking.openURL(url);
            return false;
        }
        return true;
    }

    const disableZoom = `
        var meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
        document.getElementsByTagName('head')[0].appendChild(meta);
    `;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'stretch' }}>
                <LeaveSurveyModal
                    visible={isModalVisible}
                    setIsVisible={setIsModalVisible}
                    leaveSurveHandler={onBackPressed} />
                {!isPageOfferwall && (
                    <Gradient style={{ height: 50 }} colors={color} >
                        <View style={styles.headerView}>
                            <TouchableOpacity onPress={() => setIsModalVisible(true)} style={styles.chevronTouchable}>
                                <Image source={Images.circleChevronLeftRegular}
                                    style={[styles.image, { tintColor: isColorLuminant(color) ? 'black' : 'white' }]} />
                            </TouchableOpacity>
                        </View>
                    </Gradient>
                )}
                <WebView
                    key={key}
                    scalesPageToFit={false}
                    javaScriptEnabled={true}
                    onLoadStart={onLoadProgress}
                    injectedJavaScript={disableZoom}
                    source={{ uri: url }} style={styles.webview}
                    onShouldStartLoadWithRequest={onShouldStartLoadingWithRequest} />
                {isPageOfferwall && (
                    <TouchableOpacity onPress={onExitPressed} style={styles.xmarkTouchable}>
                        <Image source={Images.signOutRegular} style={[styles.image, { tintColor: isColorDim(color) ? 'white' : 'black' }]} />
                    </TouchableOpacity>
                )}
            </View>
        </SafeAreaView>
    );
}

const isColorDim = (color: String[]) => Appearance.getColorScheme() === 'dark' || !isColorLuminant(color);

const extractValue = (url: string) => {
    if (!url.includes('&val=')) return 0.0;

    const params = url.split(/([?,=,&])/);
    const index = params.indexOf('val');
    const value = params[index + 2];

    return parseFloat(value ?? '0');
}

const extractClickId = (url: string) => {
    if (!url.startsWith('https://redirect.bitlabs.ai/'))
        return null;

    const params = url.split(/([?,=,&])/)
    let index = params.indexOf('clk');
    const clk = params[index + 2];

    if (!clk) return null;

    return clk;
}

export default OfferWall;