import { StyleSheet } from "react-native";

const genericView = {
    flex: 1,
    margin: 4,
    borderRadius: 10,
}

const styles = (margin: number, color: string) => StyleSheet.create({
    container: {
        width: 300,
        height: 80,
        margin: margin,
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor: color,
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

export default styles;