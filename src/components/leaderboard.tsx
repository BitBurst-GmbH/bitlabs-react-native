import React, { useEffect, useState } from "react"
import type { GetLeaderboardResponse } from "../api/bitlabs_repository.types"
import { getLeaderboardRepo } from "../api/bitlabs_repository";
import { FlatList, Text, View } from "react-native";
import LeaderboardItem from "./leaderboard-item";

type Props = {
    uid: string, token: string,
}

const Leaderboard = ({ uid, token }: Props) => {
    const [leaderboard, setLeaderboard] = useState<GetLeaderboardResponse>();

    useEffect(() => {
        getLeaderboardRepo(token, uid, leaderboard => setLeaderboard(leaderboard));
    }, []);

    return (
        <View style={{ backgroundColor: 'green', alignSelf: 'stretch', height: '25%' }}>
            <Text style={{ fontSize: 20 }}>Leaderboard</Text>
            <Text>You are currently ranked 6 on our leaderboard.</Text>
            <FlatList
                data={leaderboard?.top_users}
                renderItem={({ item }) => <LeaderboardItem user={item} isOwnUser={(leaderboard?.own_user?.rank) == item.rank} />} />
        </View>
    );
}

export default Leaderboard;