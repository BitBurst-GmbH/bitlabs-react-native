import React from 'react'
import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = { visible: boolean, setIsVisible: (isVisible: boolean) => void, leaveSurveHandler: () => void };

const leaveReasons = {
    "SENSITIVE": 'Too Sensitive',
    "UNINTERESTING": 'Uninteresting',
    "TECHNICAL": 'Technical Issues',
    "TOO_LONG": 'Too Long',
    "OTHER": 'Other Reasons',
};

export const LeaveSurveyModal = ({ visible, setIsVisible, leaveSurveHandler }: Props) => {

    const closeDialog = () => setIsVisible(false);

    return (<Modal
        animationType='fade'
        transparent={true}
        visible={visible}
        onRequestClose={() => {
            Alert.alert("Modal has been closed.");
        }} >
        <View style={styles.mainContainer} >
            <TouchableOpacity style={styles.blackBackground} onPress={closeDialog} />
            <View style={styles.dialog} >
                <Text style={styles.title}>Choose a reason for leaving the survey</Text>
                {Object.entries(leaveReasons).map(([key, value]) => (
                    <TouchableOpacity onPress={() => {
                        console.log(key);
                        leaveSurveHandler();
                        closeDialog();
                    }}>
                        <Text key={key} style={styles.item}>{value}</Text>
                    </TouchableOpacity>
                ))}
                <TouchableOpacity onPress={closeDialog}>
                    <Text style={styles.item}>Continue with survey</Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>);
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0004',
    },
    blackBackground: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    dialog: {
        padding: 16,
        width: '80%',
        borderRadius: 10,
        backgroundColor: '#fff',
    },
    title: {
        fontWeight: '700',
        fontSize: 20,
        color: '#000',
        marginBottom: 10,
    },
    item: {
        color: '#000',
        paddingVertical: 10,
    },
});