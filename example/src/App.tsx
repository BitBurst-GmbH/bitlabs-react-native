import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { BitLabsService, BitLabsWidget, Offerwall, WidgetType } from 'bitlabs';
import { APP_TOKEN } from './config';
import styles from './styles';

const UID = 'oblivatevariegata';

const HomeScreen = () => {
  BitLabsService.init(APP_TOKEN, UID);

  Offerwall.init(APP_TOKEN, UID);
  Offerwall.setOnReward((reward) => {
    console.log(`Reward this time: ${reward}`);
  });
  Offerwall.setOnOfferwallClosed(() => {
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
          onPress={() => Offerwall.launch()}
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
          onPress={() => Offerwall.requestTrackingAuthorization()}
        >
          <Text style={{ color: '#fff' }}>Request Ad Id (iOS Only)</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box} onPress={() => Offerwall.launch()}>
          <Text style={{ color: '#fff' }}>Open Offerwall</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.box, { flex: 1 }]}
          onPress={() =>
            BitLabsService.checkSurveys()
              .then((hasSurveys) => console.log(`Has Surveys: ${hasSurveys}`))
              .catch((error) => console.log(error.message))
          }
        >
          <Text style={{ color: '#fff' }}>Check Surveys</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.box, { flex: 1 }]}
          onPress={() =>
            BitLabsService.getSurveys()
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
          onPress={() => Offerwall.launch()}
        />
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
