import React, { useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card, Input } from "antd";
import moment from "moment";

import { useGetCryptoNewsQuery } from "../services/newsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";
const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
  const newsCount = simplified ? 3 : 10;
  const [interestCoin, setInterestCoin] = useState("crypto");

  const { data: cryptoNews } = useGetCryptoNewsQuery({
    search: interestCoin,
    count: newsCount,
  });
  const { data: cryptoCoins } = useGetCryptosQuery(100);

  const demoImage =
    "https://thumbs.dreamstime.com/b/crypto-currency-news-headline-line-icon-crypto-currency-news-headline-line-icon-linear-style-sign-mobile-concept-web-161239752.jpg";

  if (!cryptoNews?.value) {
    return "Loading";
  }

  return (
    <>
      <Row gutter={[32, 32]}>
        <Col span={24}>
          <Select
            showSearch
            className='select-news'
            placeholder='Select a Crypto'
            optionFilterProp='children'
            onChange={(value) => {
              setInterestCoin(value);
            }}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }>
            <Option value='crypto'>All</Option>
            {cryptoCoins?.data?.coins.map((coin) => (
              <Option key={'option' + coin.name} value={coin.name}>{coin.name}</Option>
            ))}
          </Select>
        </Col>
        {cryptoNews?.value.map((news, i) => (
          <Col xs={24} sm={12} lg={8} key={`news + ${i}`}>
            <Card className='news-card' hoverable>
              <a href={news.url} target='_blank' rel='noreferrer'>
                <div className='news-image-container'>
                  <Title level={5} className='news-title'>
                    {news.name}
                  </Title>
                  <img
                    style={{ width: "100px", height: "100px" }}
                    src={news?.image?.thumbnail?.contentUrl || demoImage}
                    alt='news'
                  />
                </div>
                <p>
                  {news.description > 100
                    ? `${news.description.substring(0, 100)}...}`
                    : news.description}
                </p>
                <div className='provider-container'>
                  <div>
                    <Avatar
                      src={news?.provider[0]?.image?.thumbnail?.contentUrl}
                    />
                    <Text className='provider-name'>
                      {news?.provider[0]?.name}
                    </Text>
                  </div>
                </div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}>
                  <Text style={{ display: "block" }}>
                    {moment(news.datePublished).startOf("ss").fromNow()}
                  </Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default News;
