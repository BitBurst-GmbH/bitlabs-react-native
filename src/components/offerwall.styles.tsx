import { StyleSheet } from "react-native";

const styles = (color: string) => StyleSheet.create({
    webview: { flex: 1, },
    headerView: {
        height: 50,
        alignItems: 'center',
        flexDirection: 'row',
        borderColor: '#000000',
        borderBottomWidth: 0.5,
        backgroundColor: color,
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
