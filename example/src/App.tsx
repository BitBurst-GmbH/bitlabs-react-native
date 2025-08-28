import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { BitLabsAPI, BitLabsOfferwall } from 'bitlabs';
import { APP_TOKEN } from './config';
import styles from './styles';
import { CustomButton } from './button';

const UID = 'oblivatevariegata';

const HomeScreen = () => {
  BitLabsAPI.init(APP_TOKEN, UID);

  BitLabsOfferwall.init(APP_TOKEN, UID);
  BitLabsOfferwall.setOnReward((reward) => {
    console.log(`Reward this time: ${reward}`);
  });
  BitLabsOfferwall.setOnOfferwallClosed(() => {
    console.log('Offerwall closed');
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonsContainer}>
        <CustomButton
          text="Open Shopping Merchant: 7"
          style={styles.box}
          onPress={() => BitLabsOfferwall.openMagicReceiptsMerchant('7')}
        />
        <CustomButton
          text="Open Shopping Offer: 311768"
          style={styles.box}
          onPress={() => BitLabsOfferwall.openMagicReceiptsOffer('311768')}
        />
        <CustomButton
          text="Request Ad Id (iOS Only)"
          style={styles.box}
          onPress={() => BitLabsOfferwall.requestTrackingAuthorization()}
        />
        <CustomButton
          text="Open Offer with id: 1671485"
          style={styles.box}
          onPress={() => BitLabsOfferwall.openOffer('1671485')}
        />
        <CustomButton
          text="Open Offerwall"
          style={[styles.box, { flexBasis: '100%' }]}
          onPress={() => BitLabsOfferwall.launch()}
        />
        <CustomButton
          text="Check Surveys"
          style={styles.box}
          onPress={() =>
            BitLabsAPI.checkSurveys()
              .then((hasSurveys) => console.log(`Has Surveys: ${hasSurveys}`))
              .catch((error) => console.log(error.message))
          }
        />
        <CustomButton
          text="Get Surveys"
          style={styles.box}
          onPress={() =>
            BitLabsAPI.getSurveys()
              .then((surveys) => {
                console.log(`Surveys found: ${surveys.length}.`);
                surveys.forEach((s) => {
                  console.log(`Survey ${s.id} in ${s.category.name}`);
                });
              })
              .catch((error) => console.log(error.message))
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
