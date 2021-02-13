import React, {useEffect, useState} from "react";
import Loader from "../../../Components/Loader";
import styled from "styled-components";
import Exchanges from "../../../Components/DetailExchanges";
import {getCoinsIdExchanges} from "../../../api";

const Container = styled.div``;

export const DetailExchangesScreen = (props) => {
    const [detailExchanges, setDetailExchanges] = useState([]);
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
            const {data: detailExchangesData} = await getCoinsIdExchanges(coins_id);
            setFullData(detailExchangesData);
            setLoading(false);
        } catch (e) {
            console.log(e);
        }
    }

    const coinExchangesData = () => {
        try {
            const returnData = paginate(fullData, page);
            setDetailExchanges([...detailExchanges, ...returnData]);
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
        coinExchangesData();
        setPages(page + 1);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading]);

    useEffect(() => {
        if (!fetching) {
            return;
        }
        coinExchangesData(page + 1);
        setPages(page + 1);
        setFetching(false);
    }, [fetching])

    return (
        loading ? (
            <Loader />
        ) : (
            <Container>
                {detailExchanges && detailExchanges.length > 0 && (
                    detailExchanges.map(result => <Exchanges key={result.index} {...result} />)
                )}
            </Container>
        )
    );
}