import React, { useEffect, useState } from "react"
import type { GetLeaderboardResponse } from "../api/bitlabs_repository.types"
import { getLeaderboardRepo } from "../api/bitlabs_repository";
import { Text, View } from "react-native";

type Props = {
    uid: string, token: string,
}

const Leaderboard = ({ uid, token }: Props) => {
    const [leaderboard, setLeaderboard] = useState<GetLeaderboardResponse>();

    useEffect(() => {
        getLeaderboardRepo(token, uid, (leaderboard) => console.log(leaderboard));
    }, []);

    return (
        <View style={{ backgroundColor: 'green', alignSelf: 'stretch' }}>

        </View>
    );
}

export default Leaderboard;