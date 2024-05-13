import React, { useEffect, useState } from 'react';
import {
  createNativeStackNavigator,
  type NativeStackScreenProps,
} from '@react-navigation/native-stack';
import ReactNativeIdfaAaid, {
  type AdvertisingInfoResponse,
} from '@sparkfabrik/react-native-idfa-aaid';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  BitLabsOfferWall,
  BitLabsWidget,
  WidgetType,
  checkSurveys,
  getSurveys,
} from '../../src';
import { APP_TOKEN } from './config';
import styles from './styles';

const UID = 'oblivatevariegata1';

const HomeScreen = ({ navigation }: NativeStackScreenProps<any, any>) => {
  const token = APP_TOKEN;

  const [isLeaderboardVisible, setIsLeaderboardVisible] = useState(false);
  const [isSurveyWidgetVisible, setIsSurveyWidgetVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {isLeaderboardVisible && (
        <BitLabsWidget
          uid={UID}
          token={token}
          type={WidgetType.Leaderboard}
          onPress={() => navigation.navigate('Offerwall')}
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
          onPress={() => navigation.navigate('Offerwall')}
        >
          <Text style={{ color: '#fff' }}>Open Offerwall</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.box, { flex: 1 }]}
          onPress={() =>
            checkSurveys(
              token,
              UID,
              (hasSurveys) =>
                console.log(`[Example] Has Surveys: ${hasSurveys}`),
              (error) => console.log(error.message)
            )
          }
        >
          <Text style={{ color: '#fff' }}>Check Surveys</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.box, { flex: 1 }]}
          onPress={() =>
            getSurveys(
              token,
              UID,
              (surveys) =>
                console.log(
                  `[Example] Getting surveys -> \n${surveys
                    .map(
                      (survey) =>
                        `Survey ${survey.id} in ${survey.category.name}`
                    )
                    .join('\n')}`
                ),
              (error) => console.log(error.message)
            )
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
          token={token}
          type={WidgetType.Simple}
          onPress={() => navigation.navigate('Offerwall')}
        />
      )}
    </SafeAreaView>
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
      uid={UID}
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
