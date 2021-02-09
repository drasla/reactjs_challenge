import React from "react";
import PropTypes from "prop-types";
import Loader from "../../../Components/Loader";
import styled from "styled-components";
import Exchanges from "../../../Components/DetailExchanges";

const Container = styled.div``;

const DetailMarketPresenter = ({ loading, result: results }) =>
    loading ? (
        <Loader />
    ) : (
        <Container>
            {results && results.length > 0 && (
                results.map(result => <Exchanges key={result.index} {...result} />)
            )}
        </Container>
    );

DetailMarketPresenter.propTypes = {
    loading: PropTypes.bool.isRequired,
    result: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            fiats: PropTypes.array.isRequired
        }).isRequired
    ).isRequired
};

export default DetailMarketPresenter;
