import React, {useEffect, useState} from "react";
import Loader from "../../Components/Loader";
import styled from "styled-components";
import { Route, Switch } from "react-router-dom";
import {DetailMarketScreen} from "./Market/DetailMarketScreen";
import {DetailExchangesScreen} from "./Exchanges/DetailExchangesScreen";
import DetailRouter from "../../Components/DetailRouter";
import {getCoinsId} from "../../api";

const Title = styled.h1``;

const ItemContainer = styled.div``;

const Description = styled.p`
  margin-bottom: 30px;
`;

const OptionContainer = styled.div``;

const Option = styled.span`
  font-weight: 800;
`;

const Value = styled.span``;

export const DetailScreen = (props) => {
    const [ state, setState ] = useState({
        loading: true,
        result: []
    });

    const {
        match: {
            params: { coins_id }
        }
    } = props;

    const coinData = async () => {
        try {
            const { data: result } = await getCoinsId(coins_id);
            setState({ result, loading: false });
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        coinData();
    }, []);

    return (
        state.loading ? (
            <Loader />
        ) : (
            <ItemContainer key={state.result.index}>
                <Title>
                    {state.result.name} / {state.result.symbol}
                </Title>
                <Description>{state.result.description}</Description>
                <OptionContainer>
                    <Option>Rank:</Option> <Value>{state.result.rank}</Value>
                </OptionContainer>
                <OptionContainer>
                    <Option>Open Source:</Option>{" "}
                    <Value>{state.result.open_source ? "Yes" : "No"}</Value>
                </OptionContainer>
                <OptionContainer>
                    <Option>Proof Type:</Option> <Value>{state.result.proof_type}</Value>
                </OptionContainer>
                <OptionContainer>
                    <Option>Structure:</Option> <Value>{state.result.org_structure}</Value>
                </OptionContainer>
                <DetailRouter />
                <Switch>
                    <Route
                        exact
                        path={`/coins/:coins_id/market`}
                        component={DetailMarketScreen}
                    />
                    <Route
                        exact
                        path={`/coins/:coins_id/exchanges`}
                        component={DetailExchangesScreen}
                    />
                </Switch>
            </ItemContainer>
        )
    );
}