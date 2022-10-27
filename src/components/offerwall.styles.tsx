import { StyleSheet } from "react-native";

export default StyleSheet.create({
    webview: { flex: 1, },
    headerView: {
        height: 50,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'black',
    },
    chevronTouchable: {
        marginHorizontal: 14,
    },
    xmarkTouchable: {
        top: 16,
        right: 16,
        position: 'absolute',
    },
    image: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    }
});