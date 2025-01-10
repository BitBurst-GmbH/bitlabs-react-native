import React from 'react';
import { WidgetType } from '../api/bitlabs/types';
import WebView from 'react-native-webview';
import { TouchableOpacity, View, type ViewStyle } from 'react-native';

type Props = {
  uid: string;
  token: string;
  type: WidgetType;
  onPress: () => void;
};

export default ({ token, uid, type, onPress }: Props) => {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
        <head>
        <meta charset="utf-8" />
        <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no' />
        <style>
            html,
            body,
            #widget {
            height: 100%;
            margin: 0%;
            }
        </style>
        <script src="https://sdk.bitlabs.ai/bitlabs-sdk-v0.0.2.js"></script>
        <link
            rel="stylesheet"
            href="https://sdk.bitlabs.ai/bitlabs-sdk-v0.0.2.css"
        />
        <title>Leaderboard</title>
        </head>
        <body>
        <div id="widget"></div>

        <script>
            function initSDK() {
            window.bitlabsSDK
                .init("${token}", "${uid}")
                .then(() => {
                window.bitlabsSDK.showWidget("#widget", "${type}", {
                    onClick: () => {},
                });

                document.removeEventListener("DOMContentLoaded", this.initSDK);
                });
            }

            document.addEventListener("DOMContentLoaded", this.initSDK);
        </script>
        </body>
    </html>
    `;

  const webview = (
    <WebView
      javaScriptEnabled={true}
      source={{ html: html, baseUrl: 'https://sdk.bitlabs.ai/' }}
      style={{ backgroundColor: 'transparent' }}
      overScrollMode={'never'}
      bounces={false}
    />
  );

  const style: ViewStyle = (() => {
    switch (type) {
      case WidgetType.Leaderboard:
        return { flex: 1, alignSelf: 'stretch' };
      case WidgetType.Simple:
        return { width: 300, height: 135, alignSelf: 'center' };
      case WidgetType.Compact:
        return { width: 260, height: 95, alignSelf: 'center' };
      case WidgetType.FullWidth:
        return { height: 70, alignSelf: 'stretch' };
    }
  })();

  if (type === WidgetType.Leaderboard) {
    return <View style={style} children={webview} />;
  }

  return (
    <TouchableOpacity onPress={onPress} children={webview} style={style} />
  );
};
