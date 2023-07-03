import { StyleSheet } from "react-native";

export default (color: string) => StyleSheet.create({
    container: {
        flex: 1,
        padding: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    leftView: {
        marginHorizontal: 4,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
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
    oldRewardText: {
        fontSize: 11,
        color: '#fff',
        fontWeight: '600',
        marginHorizontal: 4,
        textDecorationLine: 'line-through',
    },
    rewardText: {
        color: '#fff',
        fontWeight: '600',
        marginHorizontal: 4,
    },
    percentageText: {
        color: color,
        fontSize: 11,
        borderRadius: 5,
        fontWeight: '600',
        paddingVertical: 2,
        marginHorizontal: 4,
        paddingHorizontal: 4,
        backgroundColor: '#fff',
    },
    rightView: {
        borderRadius: 5,
        paddingHorizontal: 24,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    earnText: {
        color: color,
        fontWeight: '600',
    },
});