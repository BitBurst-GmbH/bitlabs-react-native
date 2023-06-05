import React, { useEffect, useState } from "react"
import type { GetLeaderboardResponse } from "../api/bitlabs_repository.types"
import { getLeaderboardRepo } from "../api/bitlabs_repository";
import { Text, View } from "react-native";
import LeaderboardItem from "./leaderboard-item";

type Props = {
    uid: string, token: string,
}

const Leaderboard = ({ uid, token }: Props) => {
    const [leaderboard, setLeaderboard] = useState<GetLeaderboardResponse>();

    useEffect(() => {
        getLeaderboardRepo(token, uid, leaderboard => console.log(leaderboard));
    }, []);

    return (
        <View style={{ backgroundColor: 'green', alignSelf: 'stretch' }}>
            <Text style={{ fontSize: 20 }}>Leaderboard</Text>
            <Text>You are currently ranked 6 on our leaderboard.</Text>
            {(() => leaderboard?.top_users.map((user) => <LeaderboardItem user={user} />))()}
        </View>
    );
}

export default Leaderboard;