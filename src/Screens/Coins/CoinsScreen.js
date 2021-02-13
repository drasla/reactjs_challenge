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
    const [coins, setCoins] = useState([]);
    const [page, setPages] = useState(1);
    const [fetching, setFetching] = useState(false);
    const [loading, setLoading] = useState(true);

    const handleScroll = (event) => {
        const { target: {scrollingElement}} = event;
        if(scrollingElement.scrollHeight - scrollingElement.scrollTop === scrollingElement.clientHeight) {
            setFetching(true);
        }
    };

    const paginate = (items, pageNumber) => {
        const startIndex = (pageNumber - 1) * 50;
        const endIndex = (pageNumber - 1) * 50 + 50;
        return items.slice(startIndex, endIndex);
    }

    const coinsData = async (page) => {
        try {
            const { data: coinsData } = await getCoins();
            const returnData = paginate(coinsData, page);
            setCoins([...coins, ...returnData]);
            setLoading(false);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        coinsData(page);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (!fetching) {
            return;
        }
        setPages(page + 1);
        coinsData(page + 1);
        setFetching(false);
    }, [fetching])

    return (
        loading ? (
            <Loader />
        ) : (
            coins
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
