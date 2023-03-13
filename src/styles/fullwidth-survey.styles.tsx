import { StyleSheet } from "react-native";

export default (margin: number, color: string) => StyleSheet.create({
    container: {
        width: 400,
        height: 50,
        margin: margin,
        borderRadius: 5,
        padding: 6,
        flexDirection: 'row',
        backgroundColor: color,
        justifyContent: 'space-between',
    },
    leftView: {
        marginHorizontal: 4,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
    },
    durationView: {
        marginHorizontal: 8,
        alignItems: 'center',
        flexDirection: 'row',
    },
    durationImage: {
        width: 16,
        height: 16,
        resizeMode: 'contain',
    },
    rewardText: {
        color: '#fff',
        fontWeight: '600',
        marginHorizontal: 4,
    },
    rightView: {
        justifyContent: 'center',
        paddingHorizontal: 24,
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    earnText: {
        color: color,
        fontWeight: '600',
    },
});