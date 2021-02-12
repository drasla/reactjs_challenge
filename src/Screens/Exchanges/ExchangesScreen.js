import React, {useEffect, useState} from "react";
import Loader from "../../Components/Loader";
import Exchange from "../../Components/Exchange";
import {getExchanges} from "../../api";

export const ExchangesScreen = () => {
    const [ state, setState ] = useState({
        loading: true,
        exchanges: []
    });

    const exchangesData = async () => {
        try {
            const { data: exchanges } = await getExchanges();
            setState({
                exchanges,
                loading: false
            });
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        exchangesData();
    }, []);

    return (
        state.loading ? (
            <Loader />
        ) : (
            state.exchanges.map((exchange) => <Exchange key={exchange.id} {...exchange} />)
        )
    );
};