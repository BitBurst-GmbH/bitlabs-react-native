import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import {
  BitLabsAPI,
  BitLabsWidget,
  BitLabsOfferwall,
  WidgetType,
} from 'bitlabs';
import { APP_TOKEN } from './config';
import styles from './styles';

const UID = 'oblivatevariegata';

const HomeScreen = () => {
  BitLabsAPI.init(APP_TOKEN, UID);

  BitLabsOfferwall.init(APP_TOKEN, UID);
  BitLabsOfferwall.setOnReward((reward) => {
    console.log(`Reward this time: ${reward}`);
  });
  BitLabsOfferwall.setOnOfferwallClosed(() => {
    console.log('Offerwall closed');
  });

  const [isLeaderboardVisible, setIsLeaderboardVisible] = useState(false);
  const [isSurveyWidgetVisible, setIsSurveyWidgetVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {isLeaderboardVisible && (
        <BitLabsWidget
          uid={UID}
          token={APP_TOKEN}
          type={WidgetType.Leaderboard}
          onPress={() => BitLabsOfferwall.launch()}
        />
      )}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.box}
          onPress={() => setIsLeaderboardVisible(true)}
        >
          <Text style={{ color: '#fff' }}>Show Leaderboard</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.box}
          onPress={() => BitLabsOfferwall.requestTrackingAuthorization()}
        >
          <Text style={{ color: '#fff' }}>Request Ad Id (iOS Only)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.box}
          onPress={() => BitLabsOfferwall.launch()}
        >
          <Text style={{ color: '#fff' }}>Open Offerwall</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.box, { flex: 1 }]}
          onPress={() =>
            BitLabsAPI.checkSurveys()
              .then((hasSurveys) => console.log(`Has Surveys: ${hasSurveys}`))
              .catch((error) => console.log(error.message))
          }
        >
          <Text style={{ color: '#fff' }}>Check Surveys</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.box, { flex: 1 }]}
          onPress={() =>
            BitLabsAPI.getSurveys()
              .then((surveys) => {
                console.log(`Surveys found: ${surveys.length}.`);
                surveys.forEach((s) => {
                  console.log(`Survey ${s.id} in ${s.category.name}`);
                });
              })
              .catch((error) => console.log(error.message))
          }
        >
          <Text style={{ color: '#fff' }}>Get Surveys</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.box}
          onPress={() => setIsSurveyWidgetVisible(true)}
        >
          <Text style={{ color: '#fff' }}> Show Survey Widget </Text>
        </TouchableOpacity>
      </View>
      {isSurveyWidgetVisible && (
        <BitLabsWidget
          uid={UID}
          token={APP_TOKEN}
          type={WidgetType.Simple}
          onPress={() => BitLabsOfferwall.launch()}
        />
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
