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



    const coinExchangesData = async () => {
        try {
            const { data: detailExhcangesData } = await getCoinsIdExchanges(coins_id);
            const returnData = paginate(detailExhcangesData, page);
            setDetailExchanges([...detailExchanges, ...returnData]);
            setLoading(false);
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        coinExchangesData(page);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (!fetching) {
            return;
        }
        setPages(page + 1);
        coinExchangesData(page + 1);
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