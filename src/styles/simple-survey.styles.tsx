import { StyleSheet } from "react-native";


export default () => StyleSheet.create({
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
    earnText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        marginLeft: 24
    },
    durationText: {
        color: '#fff',
        fontWeight: '600',
        marginLeft: 24
    },
});
