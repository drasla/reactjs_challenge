import React, {useEffect, useState} from "react";
import Loader from "../../Components/Loader";
import Price from "../../Components/Price";
import {getPrices} from "../../api";

export const PricesScreen = () => {
    const [prices, setPrices] = useState([]);
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

    const pricesData = async () => {
        try {
            const { data: pricesData } = await getPrices();
            const returnData = paginate(pricesData, page);
            setPrices([...prices, ...returnData]);
            setLoading(false);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        pricesData(page);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (!fetching) {
            return;
        }
        setPages(page + 1);
        pricesData(page + 1);
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