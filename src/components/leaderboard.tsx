import React, { useEffect, useState } from "react"
import type { GetLeaderboardResponse } from "../api/bitlabs_repository.types"
import { getAppSettingsRepo, getCurrencyIconRepo, getLeaderboardRepo } from "../api/bitlabs_repository";
import { FlatList, Image, Text, View } from "react-native";
import LeaderboardItem from "./leaderboard-item";
import { SvgFromUri } from "react-native-svg";

type Props = {
    uid: string, token: string,
}

const Leaderboard = ({ uid, token }: Props) => {
    const [url, setUrl] = useState<string>();
    const [currencyIcon, setCurrencyIcon] = useState<React.JSX.Element>();
    const [leaderboard, setLeaderboard] = useState<GetLeaderboardResponse>();

    useEffect(() => {
        getLeaderboardRepo(token, uid, leaderboard => setLeaderboard(leaderboard));
        getAppSettingsRepo(token, uid, (_1, _2, _3, url) => setUrl(url));
    }, []);

    useEffect(() => {
        if (url) {
            console.log('url', url);
            getCurrencyIconRepo(url, (iconUri, isSvg) => setCurrencyIcon(
                isSvg
                    ? <SvgFromUri uri={iconUri} width={20} height={20} style={{ marginHorizontal: 2 }} />
                    : <Image source={{ uri: iconUri }} style={{ width: 20, height: 20, resizeMode: 'contain' }} />
            ));
        }
    }, [url]);

    return (
        <View style={{ backgroundColor: 'green', alignSelf: 'stretch', height: '25%' }}>
            <Text style={{ fontSize: 20 }}>Leaderboard</Text>
            <Text>You are currently ranked 6 on our leaderboard.</Text>
            <FlatList
                data={leaderboard?.top_users}
                renderItem={({ item }) => <LeaderboardItem user={item}
                    isOwnUser={(leaderboard?.own_user?.rank) == item.rank}
                    currency={currencyIcon} />}
            />
        </View>
    );
}

export default Leaderboard;