import { View, StyleSheet, Image } from 'react-native'
import React from 'react'

const RatingBar = () => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={require('../assets/star-regular.png')} />
            <Image
                style={styles.image}
                source={require('../assets/star-regular.png')} />
            <Image
                style={styles.image}
                source={require('../assets/star-regular.png')} />
            <Image
                style={styles.image}
                source={require('../assets/star-regular.png')} />
            <Image
                style={styles.image}
                source={require('../assets/star-regular.png')} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    image: {
        margin: 2,
        width: 16,
        height: 16,
        resizeMode: 'contain',
    },
});

export default RatingBar;