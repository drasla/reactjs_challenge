import React from "react";
import PropTypes from "prop-types";
import Loader from "../../Components/Loader";
import Coin from "../../Components/Coin";
import styled from "styled-components";
import { Link } from "react-router-dom";

const CoinsPresenter = ({ loading, coins }) =>
    loading ? (
        <Loader />
    ) : (
        coins
            .filter((coin) => coin.rank !== 0)
            .sort((first, second) => first.rank - second.rank)
            .map((coin) => (
                <Link to={`/coins/${coin.id}`}>
                    <Coin key={coin.id} {...coin} />
                </Link>
            ))
    );

CoinsPresenter.propTypes = {
    loading: PropTypes.bool.isRequired,
    coins: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            symbol: PropTypes.string.isRequired,
            rank: PropTypes.number.isRequired
        }).isRequired
    ).isRequired
};

export default CoinsPresenter;
