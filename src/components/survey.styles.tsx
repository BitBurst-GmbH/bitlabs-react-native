import { StyleSheet } from "react-native";

const genericView = {
    flex: 1,
    margin: 4,
    borderRadius: 10,
}

export default StyleSheet.create({
    container: {
        width: 300,
        height: 80,
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor: '#fcd',
        justifyContent: 'space-between',
    },
    leftView: {
        ...genericView,
        flex: 1,
        padding: 8,
        justifyContent: 'space-evenly',
    },
    durationView: {
        flexDirection: 'row',
    },
    durationImage: {
        width: 16,
        height: 16,
        marginStart: 8,
        resizeMode: 'contain',
    },
    durationText: {
        color: '#fff',
        fontWeight: '600',
        marginHorizontal: 8
    },
    rightView: {
        ...genericView,
        flex: 0.9,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'space-around',
    },
    playImage: {
        width: 42,
        height: 42,
        tintColor: '#fcd',
        resizeMode: 'contain',
    },
    earnText: {
        fontSize: 16,
        color: '#fcd',
        fontWeight: '500',
    },
});