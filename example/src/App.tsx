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
  BitLabsService,
  BitLabsWidget,
  WidgetType,
} from 'bitlabs';
import { APP_TOKEN } from './config';
import styles from './styles';

const UID = 'oblivatevariegata';

const HomeScreen = ({ navigation }: NativeStackScreenProps<any, any>) => {
  BitLabsService.init(APP_TOKEN, UID);

  const [isLeaderboardVisible, setIsLeaderboardVisible] = useState(false);
  const [isSurveyWidgetVisible, setIsSurveyWidgetVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {isLeaderboardVisible && (
        <BitLabsWidget
          uid={UID}
          token={APP_TOKEN}
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
      tags={{}}
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
