import React from "react";
import PropTypes from "prop-types";
import Loader from "../../../Components/Loader";
import Coin from "../../../Components/Coin";
import styled from "styled-components";
import { Link, BaseRouter as Router, Route } from "react-router-dom";

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

const DetailPresenter = ({ loading, result }) =>
    loading ? (
        <Loader />
    ) : (
        <ItemContainer>
            <Title>
                {result.name} / {result.symbol}
            </Title>
            <Description>{result.description}</Description>
            <OptionContainer>
                <Option>Rank:</Option> <Value>{result.rank}</Value>
            </OptionContainer>
            <OptionContainer>
                <Option>Open Source:</Option>{" "}
                <Value>{result.open_source ? "Yes" : "No"}</Value>
            </OptionContainer>
            <OptionContainer>
                <Option>Proof Type:</Option> <Value>{result.proof_type}</Value>
            </OptionContainer>
            <OptionContainer>
                <Option>Structure:</Option> <Value>{result.org_structure}</Value>
            </OptionContainer>
            <ButtonContainer></ButtonContainer>
        </ItemContainer>
    );

DetailPresenter.propTypes = {
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

export default DetailPresenter;
