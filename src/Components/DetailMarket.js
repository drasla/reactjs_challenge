import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  margin-bottom: 10px;
`;

const Div = styled.div``;


const Href = styled.a`
`;


const Market = ({ exchange_name, market_url }) => (
    <Container>
        {market_url ? (
            <Href href={market_url} target="_blank">{exchange_name}</Href>
        ) : (
            <Div>{exchange_name}</Div>
        )}
    </Container>
);

Market.propTypes = {
    exchange_id: PropTypes.string.isRequired,
    exchange_name: PropTypes.string.isRequired,
    market_url: PropTypes.string
};

export default Market;
