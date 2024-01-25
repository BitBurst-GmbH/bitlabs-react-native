import React from 'react';
import { Alert, Modal, Text, TouchableOpacity, View } from 'react-native';
import styles from '../styles/leave-survey-modal.styles';

type Props = {
  visible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  leaveSurveyHandler: (reason: string) => void;
};

const leaveReasons = {
  SENSITIVE: 'Too Sensitive',
  UNINTERESTING: 'Uninteresting',
  TECHNICAL: 'Technical Issues',
  TOO_LONG: 'Too Long',
  OTHER: 'Other Reasons',
};

const LeaveSurveyModal = ({
  visible,
  setIsVisible,
  leaveSurveyHandler,
}: Props) => {
  const closeDialog = () => setIsVisible(false);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => Alert.alert('Modal has been closed.')}
    >
      <View style={styles.mainContainer}>
        <TouchableOpacity
          style={styles.blackBackground}
          onPress={closeDialog}
        />
        <View style={styles.dialog}>
          <Text style={styles.title}>
            Choose a reason for leaving the survey
          </Text>
          {Object.entries(leaveReasons).map(([key, value]) => (
            <TouchableOpacity
              key={key}
              onPress={() => {
                closeDialog();
                leaveSurveyHandler(key);
              }}
            >
              <Text style={styles.item}>{value}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={closeDialog}>
            <Text style={styles.item}>Continue with survey</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default LeaveSurveyModal;
