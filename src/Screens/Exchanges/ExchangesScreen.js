import React, {useEffect, useState} from "react";
import Loader from "../../Components/Loader";
import Exchange from "../../Components/Exchange";
import {getCoinsIdExchanges, getExchanges} from "../../api";

export const ExchangesScreen = () => {
    const [exchanges, setExchanges] = useState([]);
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

    const recieveData = async () => {
        try {
            const { data: exchangesData } = await getExchanges();
            setFullData(exchangesData);
            setLoading(false);
        } catch (e) {
            console.log(e);
        }
    }

    const exchangesData = async () => {
        try {
            const returnData = paginate(fullData, page);
            setExchanges([...exchanges, ...returnData]);
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
        exchangesData();
        setPages(page + 1);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading]);

    useEffect(() => {
        if (!fetching) {
            return;
        }
        exchangesData(page + 1);
        setPages(page + 1);
        setFetching(false);
    }, [fetching])

    return (
        loading ? (
            <Loader />
        ) : (
            exchanges.map((exchange) => <Exchange key={exchange.id} {...exchange} />)
        )
    );
};