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

    const coinMarketData = async (page) => {
        try {
            const { data: detailMarketData } = await getCoinsIdMarkets(coins_id);
            const returnData = paginate(detailMarketData, page);
            setDetailMarket([...detailMarket, ...returnData]);
            setLoading(false);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        coinMarketData(page);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (!fetching) {
            return;
        }
        setPages(page + 1);
        coinMarketData(page + 1);
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