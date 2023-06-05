import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { User } from '../api/bitlabs_repository.types';

type Props = {
    user: User,
}

const LeaderboardItem = ({ user }: Props) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
            <View style={{ flexDirection: 'row', backgroundColor: 'red' }}>
                <Text style={[styles.text, { marginEnd: 14 }]}>{user.rank}</Text>
                <Text style={[styles.text]}>{user.name}</Text>
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
