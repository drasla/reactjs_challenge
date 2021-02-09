import React from "react";
import PropTypes from "prop-types";
import Loader from "../../../Components/Loader";
import styled from "styled-components";
import { Link, BaseRouter as Router, Route } from "react-router-dom";

const Container = styled.div``;

const Title = styled.h1``;

const ItemContainer = styled.div``;

const Description = styled.p`
  margin-bottom: 30px;
`;

const OptionContainer = styled.div``;

const ButtonContainer = styled.div``;

const Option = styled.span`
  font-weight: 800;
`;

const Value = styled.span``;

const DetailMarketPresenter = ({ loading, result: results }) =>
    loading ? (
        <Loader />
    ) : (
        <Container>
            {results && results.length > 0 && (
                <ItemContainer>
                    {results.map((result) => {
                        console.log(result)
                        result.exchange_name;
                    })}
                </ItemContainer>
            )}
        </Container>
    );

DetailMarketPresenter.propTypes = {
    loading: PropTypes.bool.isRequired,
    result: PropTypes.arrayOf(
        PropTypes.shape({
            exchange_id: PropTypes.string.isRequired,
            exchange_name: PropTypes.string.isRequired,
            market_url: PropTypes.string.isRequired
        }).isRequired
    ).isRequired
};

export default DetailMarketPresenter;
