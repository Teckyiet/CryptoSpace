import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
  "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
  "X-RapidAPI-Key": "f3f6aa625dmsh940fa8d9176f30ap11641ejsnca665ea383e8",
};

const baseUrl = "https://coinranking1.p.rapidapi.com";

const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    getCryptoDetails: builder.query({
      query: ({ crypto }) =>
        createRequest(`/coin/${crypto}`),
    }),
    getCryptoHistory: builder.query({
      query: ({ crypto, timeStamp }) =>
        createRequest(`/coin/${crypto}/history/?timePeriod=${timeStamp}`),
    }),
    getCryptoExchanges: builder.query({
      query: ({ crypto }) =>
        createRequest(`/coin/${crypto}/exchanges/?limit=50`),
    }),
  }),
});

export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
  useGetCryptoExchangesQuery
} = cryptoApi;
