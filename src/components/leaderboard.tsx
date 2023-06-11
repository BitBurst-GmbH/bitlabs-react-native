import React, { useEffect, useState } from "react"
import type { GetLeaderboardResponse } from "../api/bitlabs_repository.types"
import { getAppSettingsRepo, getCurrencyIconRepo, getLeaderboardRepo } from "../api/bitlabs_repository";
import { FlatList, Image, Text, View } from "react-native";
import LeaderboardItem from "./leaderboard-item";
import { SvgFromUri } from "react-native-svg";
import { extractColors } from "../utils/helpers";

type Props = {
    uid: string, token: string,
}

const Leaderboard = ({ uid, token }: Props) => {
    const [url, setUrl] = useState<string>();
    const [color, setColor] = useState('#000');
    const [currencyIcon, setCurrencyIcon] = useState<React.JSX.Element>();
    const [leaderboard, setLeaderboard] = useState<GetLeaderboardResponse>();

    useEffect(() => {
        getLeaderboardRepo(token, uid, leaderboard => setLeaderboard(leaderboard));
        getAppSettingsRepo(token, uid, (color, _2, _3, url) => {
            setUrl(url);
            setColor(extractColors(color)[0]?.toString() || '#000');
        });
    }, []);

    useEffect(() => {
        if (url) {
            getCurrencyIconRepo(url, (iconUri, isSvg) => setCurrencyIcon(
                isSvg
                    ? <SvgFromUri uri={iconUri} width={20} height={20} style={{ marginHorizontal: 2 }} />
                    : <Image source={{ uri: iconUri }} style={{ width: 20, height: 20, resizeMode: 'contain' }} />
            ));
        }
    }, [url]);

    return leaderboard?.top_users ? (
        <View style={{ alignSelf: 'stretch', height: '25%' }}>
            <Text style={{ fontSize: 20 }}>Leaderboard</Text>
            <Text>You are currently ranked 6 on our leaderboard.</Text>
            <FlatList
                data={leaderboard?.top_users}
                ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: '#000', marginHorizontal: 4 }} />}
                renderItem={({ item }) => <LeaderboardItem
                    user={item}
                    color={color}
                    isOwnUser={(leaderboard?.own_user?.rank) == item.rank}
                    currency={currencyIcon} />}
            />
        </View>
    ) : null;
}

export default Leaderboard;