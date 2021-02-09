import axios from "axios";

const api = axios.create({
    baseURL: "https://api.coinpaprika.com/v1"
});

export const getPrices = () => api.get("/tickers");
export const getExchanges = () => api.get("/exchanges");
export const getCoins = () => api.get("/coins");
export const getCoinsId = (coins_id) => api.get(`/coins/${coins_id}`);
export const getCoinsIdExchanges = (coins_id) =>
    api.get(`/coins/${coins_id}/exchanges`);
export const getCoinsIdMarkets = (coins_id) =>
    api.get(`/coins/${coins_id}/markets`);
