import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { useGetCryptoNewsQuery } from "../services/newsApi";
import { Cryptocurrency, News } from "../components";

const Homepage = () => {
  const { Title } = Typography;

  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;

  const {data: news, isFetching: newsFetch} = useGetCryptoNewsQuery()

  if (isFetching) {
    return "Loading...";
  }

  return (
    <>
      <Title level={2} className='heading'>
        Global Crypto Stats
      </Title>
      <Row>
        <Col span={12}>
          <Statistic
            title='Total Cryptocurrencies'
            value={globalStats.total}></Statistic>
        </Col>
        <Col span={12}>
          <Statistic
            title='Total Exchanges'
            value={millify(globalStats.totalExchanges)}></Statistic>
        </Col>{" "}
        <Col span={12}>
          <Statistic
            title='Total Market Cap'
            value={millify(globalStats.totalMarketCap)}></Statistic>
        </Col>{" "}
        <Col span={12}>
          <Statistic
            title='Total 24h Volume'
            value={millify(globalStats.total24hVolume)}></Statistic>
        </Col>{" "}
        <Col span={12}>
          <Statistic
            title='Total Markets'
            value={millify(globalStats.totalMarkets)}></Statistic>
        </Col>
      </Row>
      <div className='home-heading-container'>
        <Title level={2} className='home-title'>
          Top 10 Cryptocurrencies in the world
        </Title>
        <Title level={3} className='show-more'>
          <Link to='/CryptoSpace/cryptocurrency'>Show More</Link>
        </Title>
      </div>
      <Cryptocurrency simplified />
      <div className='home-heading-container'>
        <Title level={2} className='home-title'>
          Latest Crypto News
        </Title>
        <Title level={3} className='show-more'>
          <Link to='/CryptoSpace/news'>Show More</Link>
        </Title>
      </div>
      <News simplified />
    </>
  );
};

export default Homepage;
