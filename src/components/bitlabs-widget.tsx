import React from 'react';
import { WidgetType } from '../api/types';
import WebView from 'react-native-webview';
import { View, type ViewStyle } from 'react-native';

type Props = {
  uid: string;
  token: string;
  type: WidgetType;
};

export default ({ token, uid, type }: Props) => {
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

  return (
    <View style={[styleByType(type)]}>
      <WebView
        source={{ html: html, baseUrl: 'https://sdk.bitlabs.ai/' }}
        style={{ backgroundColor: 'transparent' }}
        overScrollMode={'never'}
        bounces={false}
      />
    </View>
  );
};

const styleByType: (type: WidgetType) => ViewStyle = (type: WidgetType) => {
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
};
