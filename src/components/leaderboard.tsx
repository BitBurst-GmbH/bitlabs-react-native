import React, { useEffect, useState } from "react"
import type { GetLeaderboardResponse } from "../api/types"
import { getAppSettings, getIsImageSVG, getLeaderboard } from "../api/bitlabs_repository";
import { FlatList, Text, View } from "react-native";
import LeaderboardItem from "./leaderboard-item";
import { extractColors } from "../utils/helpers";
import { CurrencyIcon } from "../hoc/currency-icon";

type Props = {
    uid: string, token: string,
}

const Leaderboard = ({ uid, token }: Props) => {
    const [color, setColor] = useState('#000');
    const [currencyIcon, setCurrencyIcon] = useState<React.JSX.Element>();
    const [leaderboard, setLeaderboard] = useState<GetLeaderboardResponse>();

    useEffect(() => {
        getLeaderboard(token, uid, leaderboard => setLeaderboard(leaderboard));
        getAppSettings(token, uid, (color, _2, _3, _4, url) => {

            if (url) getIsImageSVG(url, (isSvg) => setCurrencyIcon(<CurrencyIcon isSVG={isSvg} url={url} size={20} />));

            setColor(extractColors(color)[0]?.toString() || '#000');
        });
    }, []);

    return leaderboard?.top_users ? (
        <View style={{ alignSelf: 'stretch', height: '25%' }}>
            <Text style={{ fontSize: 20 }}>Leaderboard</Text>
            {leaderboard.own_user
                ? (<Text>You are currently ranked {leaderboard.own_user.rank} on our leaderboard.</Text>)
                : <Text>Participate in a survey to join the leaderboard.</Text>}
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