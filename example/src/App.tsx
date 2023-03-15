import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import ReactNativeIdfaAaid, { AdvertisingInfoResponse } from '@sparkfabrik/react-native-idfa-aaid';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { BitLabsOfferWall, BitLabsSurveys, checkSurveys, getSurveys } from '../../src';

const TOKEN = 'APP_TOKEN';
const UID = 'USER_ID';

const HomeScreen = ({ navigation }: NativeStackScreenProps<any, any>) => (
  <View style={styles.container}>
    <TouchableOpacity
      style={styles.box}
      onPress={() => checkSurveys(TOKEN, UID, (hasSurveys) => console.log(`[Example] Has Surveys: ${hasSurveys}`), (error) => console.log(error.message))}>
      <Text>Check Surveys</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.box}
      onPress={() => getSurveys(TOKEN, UID, (surveys) => console.log(`[Example] Getting surveys -> ${surveys.map((survey) =>
        `Survey ${survey.id} in ${survey.details.category.name}`)}`), (error) => console.log(error.message))}>
      <Text>Get Surveys</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.box}
      onPress={() => navigation.navigate('Offerwall')}>
      <Text>Open Offerwall</Text>
    </TouchableOpacity>
    <BitLabsSurveys
      uid={UID}
      token={TOKEN}
      onSurveyPressed={() => navigation.navigate('Offerwall')} />
  </View >
);

const OfferWall = ({ navigation }: NativeStackScreenProps<any, any>) => {
  const [adId, setAdId] = useState('');

  useEffect(() => {
    ReactNativeIdfaAaid.getAdvertisingInfo().then(
      (res: AdvertisingInfoResponse) => { if (!res.isAdTrackingLimited) setAdId(res.id!); });
  }, []);

  return (
    <BitLabsOfferWall
      uid={UID}
      token={TOKEN}
      onExitPressed={navigation.goBack}
      onReward={reward => console.log(`Reward this time: ${reward}`)}
      adId={adId} />);
}

const Stack = createNativeStackNavigator();

export default () => (<NavigationContainer>
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name='Home' component={HomeScreen} />
    <Stack.Screen name='Offerwall' component={OfferWall} />
  </Stack.Navigator>
</NavigationContainer>);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    width: 250,
    height: 40,
    backgroundColor: '#dafaba',
    marginVertical: 10,
  },
});
