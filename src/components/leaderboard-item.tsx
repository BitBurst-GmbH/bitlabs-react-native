import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { User } from '../api/bitlabs_repository.types';

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
                {isOwnUser && <Text style={{ fontSize: 12, fontWeight: '500', color: 'blue' }}>(You)</Text>}
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
});

export default LeaderboardItem;
