import BitLabs from 'bitlabs';
import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';

export default function App() {

  BitLabs.init('46d31e1e-315a-4b52-b0de-eca6062163af', 'USER_ID');

  BitLabs.checkSurveys();

  return (
    <View style={styles.container}>
      <Text>BitLabs</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
