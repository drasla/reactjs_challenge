import React, {useEffect, useState} from "react";
import Loader from "../../../Components/Loader";
import styled from "styled-components";
import Market from "../../../Components/DetailMarket";
import {getCoinsIdMarkets} from "../../../api";

const Container = styled.div``;

export const DetailMarketScreen = (props) => {
    const [detailMarket, setDetailMarket] = useState([]);
    const [page, setPages] = useState(1);
    const [fetching, setFetching] = useState(false);
    const [loading, setLoading] = useState(true);
    const [fullData, setFullData] = useState([]);

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

    const {
        match: {
            params: { coins_id }
        }
    } = props;

    const recieveData = async () => {
        try {
            const {data: detailMarketData} = await getCoinsIdMarkets(coins_id);
            setFullData(detailMarketData);
            setLoading(false);
        } catch (e) {
            console.log(e);
        }
    }

    const coinMarketData = () => {
        try {
            const returnData = paginate(fullData, page);
            setDetailMarket([...detailMarket, ...returnData]);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        recieveData();
    }, []);

    useEffect(() => {
        if(loading) {
            return;
        }
        coinMarketData();
        setPages(page + 1);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading]);

    useEffect(() => {
        if (!fetching) {
            return;
        }
        coinMarketData(page + 1);
        setPages(page + 1);
        setFetching(false);
    }, [fetching])

    return (
        loading ? (
            <Loader />
        ) : (
            <Container>
                {detailMarket && detailMarket.length > 0 && (
                    detailMarket.map(result => <Market key={result.index} {...result} />)
                )}
            </Container>
        )
    );
}