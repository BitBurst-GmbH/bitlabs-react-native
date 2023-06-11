import { StyleSheet } from "react-native";

const genericView = {
    flex: 1,
    margin: 4,
    borderRadius: 5,
}

export default (color: string) => StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
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
        alignItems: 'center',
    },
    durationImage: {
        width: 16,
        height: 16,
        marginStart: 4,
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
        backgroundColor: '#fff',
        justifyContent: 'space-around',
    },
    playImage: {
        width: 42,
        height: 42,
        tintColor: color,
        resizeMode: 'contain',
    },
    earnText: {
        color: color,
        fontSize: 16,
        fontWeight: '500',
    },
});
