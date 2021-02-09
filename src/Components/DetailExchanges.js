import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  margin-bottom: 20px;
`;

const Item = styled.div`
`;


const Exchanges = ({ name, fiats }) => fiats.length === 0 ? "" : (
    <Container>
        <Item>{name}</Item>
        <Item>Pay On {fiats.map(fiat => `${fiat.symbol} `)}</Item>
    </Container>
);

Exchanges.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    fiats: PropTypes.array.isRequired
};

export default Exchanges;
