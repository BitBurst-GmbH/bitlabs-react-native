import BitLabs from 'bitlabs';
import * as React from 'react';

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function App() {

  BitLabs.init('46d31e1e-315a-4b52-b0de-eca6062163af', 'USER_ID');

  return (
    <View style={styles.container}>
      <Text>BitLabs</Text>
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
    </View >
  );
}

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
