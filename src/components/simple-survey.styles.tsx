import { StyleSheet } from "react-native";


const styles = (margin: number, color: string) => StyleSheet.create({
    container: {
        width: 290,
        height: 130,
        margin: margin,
        borderRadius: 5,
        flexDirection: 'row',
        backgroundColor: color,
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

export default styles;