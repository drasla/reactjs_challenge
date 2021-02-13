import React, {useEffect, useState} from "react";
import Loader from "../../Components/Loader";
import Exchange from "../../Components/Exchange";
import {getExchanges} from "../../api";

export const ExchangesScreen = () => {
    const [exchanges, setExchanges] = useState([]);
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

    const exchangesData = async () => {
        try {
            const { data: exchangesData } = await getExchanges();
            const returnData = paginate(exchangesData, page);
            setExchanges([...exchanges, ...returnData]);
            setLoading(false);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        exchangesData(page);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (!fetching) {
            return;
        }
        setPages(page + 1);
        exchangesData(page + 1);
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