import BitLabs from 'bitlabs';
import * as React from 'react';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { BitLabsOfferWall } from '../../src/components/offerwall';

const HomeScreen = ({ navigation }: NativeStackScreenProps<any, any>) => {
  BitLabs.init('46d31e1e-315a-4b52-b0de-eca6062163af', 'USER_ID');

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={(_) => BitLabs.checkSurveys((hasSurveys) => console.log(`[Example] Has Surveys: ${hasSurveys}`))}
        style={styles.box}>
        <Text>Check Surveys</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={(_) => BitLabs.getSurveys((surveys) => console.log(`[Example] Getting surveys -> ${surveys.map((survey) =>
          `Survey ${survey.id} in ${survey.details.category.name}`)}`))}
        style={styles.box}>
        <Text>Get Surveys</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={(_) => navigation.navigate('Offerwall')}
        style={styles.box}>
        <Text>Open Offerwall</Text>
      </TouchableOpacity>
    </View >
  );
}

const OfferWall = ({ navigation }: NativeStackScreenProps<any, any>) => (
  <BitLabsOfferWall
    token='46d31e1e-315a-4b52-b0de-eca6062163af'
    uid='USER_ID'
    onExitPressed={navigation.goBack}
    onReward={() => { }}
  />);

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
