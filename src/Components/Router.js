import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Header from "./Header";
import {ExchangesScreen} from "../Screens/Exchanges/ExchangesScreen";
import {PricesScreen} from "../Screens/Prices/PricesScreen";
import {DetailScreen} from "../Screens/Detail/DetailScreen";
import {CoinsScreen} from "../Screens/Coins/CoinsScreen";

export default () => {
    return (
        <Router>
            <Header />
            <Route path="/" exact component={PricesScreen} />
            <Route path="/exchanges" component={ExchangesScreen} />
            <Route path="/coins" exact component={CoinsScreen} />
            <Route path="/coins/:coins_id" component={DetailScreen} />
        </Router>
    );
};
