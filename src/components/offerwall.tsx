import React from 'react';
import WebView from 'react-native-webview';

type Props = { token: string, uid: string }

export const BitLabsOfferWall = ({ token, uid }: Props) => {
    const url = `https://web.bitlabs.ai?token=${token}&uid=${uid}`;

    return (<WebView
        source={{ uri: `${url}` }}
        style={{ flex: 1 }} />
    );
}