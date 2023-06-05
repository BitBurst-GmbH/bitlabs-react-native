import React, { useEffect } from 'react';
import { createNativeStackNavigator, type NativeStackScreenProps } from '@react-navigation/native-stack';
import ReactNativeIdfaAaid, { type AdvertisingInfoResponse } from '@sparkfabrik/react-native-idfa-aaid';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { BitLabsLeaderboard, BitLabsOfferWall, BitLabsSurveys, checkSurveys, getSurveys } from '../../src';

const HomeScreen = ({ navigation }: NativeStackScreenProps<any, any>) => {
  const token = '46d31e1e-315a-4b52-b0de-eca6062163af';
  const uid = 'USER_ID';

  return (
    <View style={styles.container}>
      <BitLabsLeaderboard
        uid={uid}
        token={token}
      />
      <TouchableOpacity
        style={styles.box}
        onPress={() => checkSurveys(token, uid, (hasSurveys) => console.log(`[Example] Has Surveys: ${hasSurveys}`), (error) => console.log(error.message))}>
        <Text>Check Surveys</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.box}
        onPress={() => getSurveys(token, uid, (surveys) => console.log(`[Example] Getting surveys -> ${surveys.map((survey) =>
          `Survey ${survey.id} in ${survey.details.category.name}`)}`), (error) => console.log(error.message))}>
        <Text>Get Surveys</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.box}
        onPress={() => navigation.navigate('Offerwall')}>
        <Text>Open Offerwall</Text>
      </TouchableOpacity>
      <BitLabsSurveys
        uid={uid}
        token={token}
        onSurveyPressed={() => navigation.navigate('Offerwall')} />
    </View >
  );
}

const OfferWall = ({ navigation }: NativeStackScreenProps<any, any>) => {
  const [adId, setAdId] = React.useState('');

  useEffect(() => {
    ReactNativeIdfaAaid.getAdvertisingInfo().then(
      (res: AdvertisingInfoResponse) => { if (!res.isAdTrackingLimited) setAdId(res.id!); });
  }, []);

  return (
    <BitLabsOfferWall
      uid='USER_ID'
      token='46d31e1e-315a-4b52-b0de-eca6062163af'
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
