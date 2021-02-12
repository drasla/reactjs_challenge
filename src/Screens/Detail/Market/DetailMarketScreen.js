import React, {useEffect, useState} from "react";
import Loader from "../../../Components/Loader";
import styled from "styled-components";
import Market from "../../../Components/DetailMarket";
import {getCoinsIdMarkets} from "../../../api";

const Container = styled.div``;

export const DetailMarketScreen = (props) => {
    const [ state, setState ] = useState({
        loading: true,
        results: []
    });

    const {
        match: {
            params: { coins_id }
        }
    } = props;

    const coinMarketData = async () => {
        try {
            const { data: results } = await getCoinsIdMarkets(coins_id);
            setState({ results, loading: false });
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        coinMarketData();
    }, []);

    return (
        state.loading ? (
            <Loader />
        ) : (
            <Container>
                {state.results && state.results.length > 0 && (
                    state.results.map(result => <Market key={result.index} {...result} />)
                )}
            </Container>
        )
    );
}