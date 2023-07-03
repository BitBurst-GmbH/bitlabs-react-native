import { StyleSheet } from "react-native";


export default (color: string) => StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    playImage: {
        width: 52,
        height: 52,
        tintColor: '#fff',
        resizeMode: 'contain',
    },
    oldRewardText: {
        fontSize: 14,
        marginEnd: 4,
        color: '#fff',
        fontWeight: '600',
        textDecorationLine: 'line-through',
    },
    earnText: {
        fontSize: 18,
        color: '#fff',
        marginLeft: 24,
        fontWeight: '600',
    },
    percentageText: {
        color: color,
        fontSize: 12,
        borderRadius: 5,
        fontWeight: '600',
        paddingVertical: 2,
        marginHorizontal: 4,
        paddingHorizontal: 4,
        backgroundColor: '#fff',
    },
    durationText: {
        color: '#fff',
        marginLeft: 24,
        fontWeight: '600',
    },
});
