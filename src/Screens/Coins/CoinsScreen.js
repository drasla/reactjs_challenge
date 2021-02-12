import React, { useState, useEffect } from "react";
import {getCoins} from "../../api";
import Loader from "../../Components/Loader";
import Coin from "../../Components/Coin";
import { Link } from "react-router-dom";
import styled from "styled-components";

const TLink = styled(Link)`
    text-decoration: underline;
    display: block;
    margin-bottom: 20px;
`;

export const CoinsScreen = () => {
    const [ state, setState ] = useState({
        loading: true,
        coins: []
    });

    const coinsData = async () => {
        try {
            const { data: coins } = await getCoins();
            setState({
                coins,
                loading: false
            });
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        coinsData();
    }, []);

    return (
        state.loading ? (
            <Loader />
        ) : (
            state.coins
                .filter((coin) => coin.rank !== 0)
                .sort((first, second) => first.rank - second.rank)
                .map((coin) => (
                    <TLink to={`/coins/${coin.id}`}>
                        <Coin key={`${coin.id}`} {...coin} />
                    </TLink>
                ))
        )
    );
}
