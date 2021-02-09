import React from "react";
import PropTypes from "prop-types";
import Loader from "../../../Components/Loader";
import styled from "styled-components";
import Market from "../../../Components/DetailMarket";

const Container = styled.div``;

const DetailMarketPresenter = ({ loading, result: results }) =>
    loading ? (
        <Loader />
    ) : (
        <Container>
            {results && results.length > 0 && (
                results.map(result => <Market key={result.index} {...result} />)
            )}
        </Container>
    );

DetailMarketPresenter.propTypes = {
    loading: PropTypes.bool.isRequired,
    result: PropTypes.arrayOf(
        PropTypes.shape({
            exchange_id: PropTypes.string.isRequired,
            exchange_name: PropTypes.string.isRequired,
            market_url: PropTypes.string
        }).isRequired
    ).isRequired
};

export default DetailMarketPresenter;
