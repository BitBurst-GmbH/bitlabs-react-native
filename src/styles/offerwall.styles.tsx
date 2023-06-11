import { StyleSheet } from "react-native";

const styles = () => StyleSheet.create({
    webview: { flex: 1, },
    headerView: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        borderColor: '#a00',
        borderBottomWidth: 0.5,
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

export default styles;
