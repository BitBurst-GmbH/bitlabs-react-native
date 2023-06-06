import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import type { User } from '../api/bitlabs_repository.types';
import images from '../assets/images';

type Props = {
    user: User,
    isOwnUser: boolean,
}

const LeaderboardItem = ({ user, isOwnUser }: Props) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={[styles.text, { marginEnd: 14 }]}>{user.rank}</Text>
                <Text style={[styles.text]}>{user.name}</Text>
                {isOwnUser && <Text style={styles.youText}>(You)</Text>}
                {user.rank < 4 && <View style={{ marginHorizontal: 12, alignItems: 'center' }}>
                    <Image source={images.trophySolid} style={[styles.trophyImage, { tintColor: 'blue' }]} />
                    <Text style={{ fontSize: 11, color: '#fff', fontWeight: '500' }}>{user.rank}</Text>
                </View>}
            </View>
            <Text style={[styles.text]}>{user.earnings_raw}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        marginHorizontal: 4,
    },
    youText: {
        fontSize: 12,
        fontWeight: '500',
        color: 'blue',
    },
    trophyImage: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        position: 'absolute',
    },
});

export default LeaderboardItem;
