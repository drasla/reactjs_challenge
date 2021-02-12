import React, {useEffect, useState} from "react";
import Loader from "../../Components/Loader";
import Price from "../../Components/Price";
import {getPrices} from "../../api";

export const PricesScreen = () => {
    const [ state, setState ] = useState({
        loading: true,
        prices: []
    });

    const coinsData = async () => {
        try {
            const { data: prices } = await getPrices();
            setState({
                prices,
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
            state.prices.map(price => <Price key={price.id} {...price} />)
        )
    );
}