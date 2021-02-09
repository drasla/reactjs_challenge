import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Header from "./Header";
import Coins from "../Screens/Coins";
import Exchanges from "../Screens/Exchanges";
import Prices from "../Screens/Prices";
import Detail from "../Screens/Detail";
import DetailMarket from "../Screens/Detail/Market";
import DetailExchanges from "../Screens/Detail/Exchanges";

export default () => {
    return (
        <Router>
            <Header />
            <Route path="/" exact component={Prices} />
            <Route path="/exchanges" component={Exchanges} />
            <Route path="/coins" exact component={Coins} />
            <Route path="/coins/:coins_id" component={Detail} />
            <Route path="/coins/:coins_id/exchanges" component={DetailExchanges} />
            <Route path="/coins/:coins_id/market" component={DetailMarket} />
        </Router>
    );
};
