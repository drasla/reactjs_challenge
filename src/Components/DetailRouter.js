import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

const List = styled.ul`
  width: 200px;
  margin: 30px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Item = styled.li`
  width: 90px;
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: 3px solid #24a476;
  border-radius: 5px;
  border-color: ${props => (props.current ? "#24a476" : "black")};
  background-color: ${props => (props.current ? "#24a476" : "transparent")};
  color: ${props => (props.current ? "white" : "black")};
  transition: all .5s ease-in-out;
`;

const SLink = styled(Link)`
`;

export default withRouter(({ match: { params: {coins_id} }, location: { pathname }}) => (
        <List>
            <Item current={pathname === `/coins/${coins_id}/market`}><SLink to={`/coins/${coins_id}/market`}>Market</SLink></Item>
            <Item current={pathname === `/coins/${coins_id}/exchanges`}><SLink to={`/coins/${coins_id}/exchanges`}>Exchanges</SLink></Item>
        </List>
));
