import React from 'react';
import WebView from 'react-native-webview';

type Props = { url?: string }

export const BitLabsWebView = ({ url }: Props) =>
(<WebView
    source={{ uri: `${url}` }}
    style={{ width: 300, height: 500, flex: 1 }} />
);