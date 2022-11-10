import BitLabs from 'bitlabs';
import * as React from 'react';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { BitLabsOfferWall } from '../../src/components/offerwall';
import Survey from '../../src/components/survey';

const HomeScreen = ({ navigation }: NativeStackScreenProps<any, any>) => {
  BitLabs.init('46d31e1e-315a-4b52-b0de-eca6062163af', 'USER_ID1');

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={(_) => BitLabs.checkSurveys((hasSurveys) => console.log(`[Example] Has Surveys: ${hasSurveys}`), (error) => console.log(error.message))}
        style={styles.box}>
        <Text>Check Surveys</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={(_) => BitLabs.getSurveys((surveys) => console.log(`[Example] Getting surveys -> ${surveys.map((survey) =>
          `Survey ${survey.id} in ${survey.details.category.name}`)}`), (error) => console.log(error.message))}
        style={styles.box}>
        <Text>Get Surveys</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={(_) => navigation.navigate('Offerwall')}
        style={styles.box}>
        <Text>Open Offerwall</Text>
      </TouchableOpacity>
      <Survey />
    </View >
  );
}

const OfferWall = ({ navigation }: NativeStackScreenProps<any, any>) => (
  <BitLabsOfferWall
    uid='USER_ID'
    token='46d31e1e-315a-4b52-b0de-eca6062163af'
    onExitPressed={navigation.goBack}
    onReward={reward => console.log(`Reward this time: ${reward}`)}
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
