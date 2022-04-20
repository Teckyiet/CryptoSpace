import React, { useState } from "react";
import parse from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import { Col, Row, Typography, Select } from "antd";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  ThunderboltOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  TrophyOutlined,
  NumberOutlined,
} from "@ant-design/icons";
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../services/cryptoApi";
import LineChart from "./LineChart";

const { Title, Text } = Typography;
const { Option } = Select;

const Cryptodetails = () => {
  let { coinUuid } = useParams();
  const [timePeriod, setTimePeriod] = useState("7d");
  const { data: crypto, isFetching } = useGetCryptoDetailsQuery({
    crypto: coinUuid,
  });
  const coinDetails = crypto?.data?.coin;
  const { data: history } = useGetCryptoHistoryQuery({
    crypto: coinUuid,
    timeStamp: timePeriod,
  });

  const time = ["3h", "24h", "7d", "30d", "3m", "1y", "3y"];
  const stats = [
    {
      title: "Price to USD",
      value: `$ ${
        coinDetails?.price && millify(coinDetails?.price, { precision: 2 })
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "Rank",
      value: `${
        coinDetails?.rank && millify(coinDetails?.rank, { precision: 2 })
      }`,
      icon: <NumberOutlined />,
    },
    {
      title: "24h Volume",
      value: `$ ${
        coinDetails?.["24hVolume"] &&
        millify(coinDetails?.["24hVolume"], { precision: 2 })
      }`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${
        coinDetails?.marketCap &&
        millify(coinDetails?.marketCap, { precision: 2 })
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${
        coinDetails?.allTimeHigh.price &&
        millify(coinDetails?.allTimeHigh.price, { precision: 2 })
      }`,
      icon: <TrophyOutlined />,
    },
  ];
  const genericStats = [
    {
      title: "Number of Exchanges",
      value: `${
        coinDetails?.numberOfExchanges &&
        millify(coinDetails?.numberOfExchanges, { precision: 2 })
      }`,
      icon: <FundOutlined />,
    },
    {
      title: "Number of Market",
      value: `${
        coinDetails?.numberOfMarkets &&
        millify(coinDetails?.numberOfMarkets, { precision: 2 })
      }`,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Total-supply",
      value: `$ ${
        coinDetails?.supply?.total &&
        millify(coinDetails?.supply?.total, { precision: 2 })
      }`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        coinDetails?.supply.circulating &&
        millify(coinDetails?.supply.circulating, { precision: 2 })
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  if (isFetching) return "Loading";

  return (
    <Col className='coin-detail-container'>
      <Col className='coin-heading-container'>
        <Title level={2} className='coin-name'>
          {coinDetails?.name} ({coinDetails?.symbol})
        </Title>
        <p>
          {coinDetails?.name} live price in US dollar. View value statistics,
          market cap and supply.
        </p>
      </Col>
      <Select
        defaultValue='7d'
        className='select-timeperiod'
        placeholder='Timestamp'
        onChange={(value) => setTimePeriod(value)}>
        {time.map((period) => (
          <Option key={period} value={period}>
            {period}
          </Option>
        ))}
      </Select>
      <LineChart history={history} cryptoName={coinDetails?.name} currentPrice={coinDetails?.price} timeStamp ={timePeriod}></LineChart>
      <Col className='stats-container'>
        <Col className='coin-value-statistics'>
          <Col className='coin-value-statistic-heading'>
            <Title className='coin-details-heading' level={3}>
              {coinDetails?.name} Value Statistics
            </Title>
            <p>An overview showing the stats of {coinDetails?.name}</p>
          </Col>
          {stats.map(({ title, value, icon }) => (
            <Col key={"0" + value} className='coin-stats'>
              <Col key={"1" + value} className='coin-stats-name'>
                <Text key={"2" + value}>{icon}</Text>
                <Text key={"3" + value}>{title}</Text>
              </Col>
              <Text key={"4" + value} className='stats'>
                {value}
              </Text>
            </Col>
          ))}
        </Col>
        <Col className='other-stats-info'>
          <Col className='coin-value-statistic-heading'>
            <Title className='coin-details-heading' level={3}>
              Other Statistics
            </Title>
            <p>An overview showing the stats of cryptocurrencies.</p>
          </Col>
          {genericStats.map(({ title, value, icon }, index) => (
            <Col className='coin-stats'>
              <Col className='coin-stats-name'>
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className='stats'>{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className='coin-desc-link'>
        <Row className='coin-desc'>
          <Title level={3} className='coin-details-heading'>
            What is {coinDetails?.name}
          </Title>
          {parse(coinDetails?.description)}
        </Row>
        <Col className='coin-links'>
          <Title level={3} className='coin-details-heading'>
            {coinDetails?.name} Links
          </Title>
          {coinDetails?.links.map((link) => (
            <Row className='coin-link' key={link?.name}>
              <Title level={5} className='link-name'>
                {link?.type}
              </Title>
              <a href={link?.url} target='_blank' rel='noreferrer'>
                {link?.name}
              </a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  );
};

export default Cryptodetails;
