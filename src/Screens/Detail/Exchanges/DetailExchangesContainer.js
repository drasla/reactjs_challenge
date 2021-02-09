import React from "react";
import DetailExchangesPresenter from "./DetailExchangesPresenter";
import {
    getCoinsId,
    getCoinsIdExchanges,
    getCoinsIdMarkets
} from "../../../api";

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            result: null,
            error: null,
            loading: true
        };
    }

    async componentDidMount() {
        const {
            match: {
                params: { coins_id }
            }
        } = this.props;

        let result = null;

        try {
            ({ data: result } = await getCoinsId(coins_id));
        } catch {
            this.setState({ error: "Can't find anything." });
        } finally {
            this.setState({ loading: false, result });
        }
    }

    render() {
        const { result, error, loading } = this.state;
        return (
            <DetailExchangesPresenter
                result={result}
                error={error}
                loading={loading}
            />
        );
    }
}
