import React, { useEffect, useState } from 'react';
import {
  createNativeStackNavigator,
  type NativeStackScreenProps,
} from '@react-navigation/native-stack';
import ReactNativeIdfaAaid, {
  type AdvertisingInfoResponse,
} from '@sparkfabrik/react-native-idfa-aaid';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  BitLabsLeaderboard,
  BitLabsOfferWall,
  BitLabsSurveys,
  checkSurveys,
  getSurveys,
  SurveyType,
} from '../../src';
import { APP_TOKEN } from './config';
import styles from './styles';

const HomeScreen = ({ navigation }: NativeStackScreenProps<any, any>) => {
  const uid = 'USER_ID';
  const token = APP_TOKEN;

  const [isLeaderboardVisible, setIsLeaderboardVisible] = useState(false);
  const [isSurveyWidgetVisible, setIsSurveyWidgetVisible] = useState(false);

  return (
    <View style={styles.container}>
      {isLeaderboardVisible && <BitLabsLeaderboard uid={uid} token={token} />}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.box}
          onPress={() => setIsLeaderboardVisible(true)}
        >
          <Text>Show Leaderboard</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate('Offerwall')}
        >
          <Text>Open Offerwall</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.box, { flex: 1 }]}
          onPress={() =>
            checkSurveys(
              token,
              uid,
              (hasSurveys) =>
                console.log(`[Example] Has Surveys: ${hasSurveys}`),
              (error) => console.log(error.message)
            )
          }
        >
          <Text>Check Surveys</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.box, { flex: 1 }]}
          onPress={() =>
            getSurveys(
              token,
              uid,
              (surveys) =>
                console.log(
                  `[Example] Getting surveys -> ${surveys.map(
                    (survey) => `Survey ${survey.id} in ${survey.category.name}`
                  )}`
                ),
              (error) => console.log(error.message)
            )
          }
        >
          <Text>Get Surveys</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.box}
          onPress={() => setIsSurveyWidgetVisible(true)}
        >
          <Text> Show Survey Widget </Text>
        </TouchableOpacity>
      </View>
      {isSurveyWidgetVisible && (
        <View style={{ backgroundColor: 'yellow' }}>
          <BitLabsSurveys
            uid={uid}
            token={token}
            type={SurveyType.Simple}
            onSurveyPressed={() => navigation.navigate('Offerwall')}
          />
        </View>
      )}
    </View>
  );
};

const OfferWall = ({ navigation }: NativeStackScreenProps<any, any>) => {
  const [adId, setAdId] = useState('');

  useEffect(() => {
    ReactNativeIdfaAaid.getAdvertisingInfo().then(
      (res: AdvertisingInfoResponse) => {
        if (!res.isAdTrackingLimited) {
          setAdId(res.id!);
        }
      }
    );
  }, []);

  return (
    <BitLabsOfferWall
      uid="USER_ID"
      token={APP_TOKEN}
      onExitPressed={navigation.goBack}
      onReward={(reward) => console.log(`Reward this time: ${reward}`)}
      adId={adId}
    />
  );
};

const Stack = createNativeStackNavigator();

export default () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Offerwall" component={OfferWall} />
    </Stack.Navigator>
  </NavigationContainer>
);
