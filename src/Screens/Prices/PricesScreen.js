import React, {useEffect, useState} from "react";
import Loader from "../../Components/Loader";
import Price from "../../Components/Price";
import {getCoinsIdExchanges, getPrices} from "../../api";

export const PricesScreen = () => {
    const [prices, setPrices] = useState([]);
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
            const { data: pricesData } = await getPrices();
            setFullData(pricesData);
            setLoading(false);
        } catch (e) {
            console.log(e);
        }
    }

    const pricesData = () => {
        try {
            const returnData = paginate(fullData, page);
            setPrices([...prices, ...returnData]);
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
        pricesData();
        setPages(page + 1);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading]);

    useEffect(() => {
        if (!fetching) {
            return;
        }
        pricesData(page + 1);
        setPages(page + 1);
        setFetching(false);
    }, [fetching])

    return (
        loading ? (
            <Loader />
        ) : (
            prices.map(price => <Price key={price.id} {...price} />)
        )
    );
}