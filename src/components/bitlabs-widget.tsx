import React from 'react';
import type { WidgetType } from '../api/types';
import WebView from 'react-native-webview';
import { StyleSheet, View } from 'react-native';

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
    <View style={styles.container}>
      <WebView
        source={{ html: html, baseUrl: 'https://sdk.bitlabs.ai/' }}
        style={styles.webview}
        overScrollMode={'never'}
        bounces={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcf',
    justifyContent: 'center',
    // alignItems: 'center',
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
