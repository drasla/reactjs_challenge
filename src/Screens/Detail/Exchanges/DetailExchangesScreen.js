import React, {useEffect, useState} from "react";
import Loader from "../../../Components/Loader";
import styled from "styled-components";
import Exchanges from "../../../Components/DetailExchanges";
import {getCoinsIdExchanges} from "../../../api";

const Container = styled.div``;

export const DetailExchangesScreen = (props) => {
    const [ state, setState ] = useState({
        loading: true,
        results: []
    });

    const {
        match: {
            params: { coins_id }
        }
    } = props;

    const coinExchangesData = async () => {
        try {
            const { data: results } = await getCoinsIdExchanges(coins_id);
            setState({ results, loading: false });
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        coinExchangesData();
    }, []);

    return (
        state.loading ? (
            <Loader />
        ) : (
            <Container>
                {state.results && state.results.length > 0 && (
                    state.results.map(result => <Exchanges key={result.index} {...result} />)
                )}
            </Container>
        )
    );
}