import React, { useState } from "react";
import { millify } from "millify";
import { Select, Collapse, Typography, Col, Row } from "antd";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import {
  useGetCryptosQuery,
  useGetCryptoExchangesQuery,
} from "../services/cryptoApi";

const { Title } = Typography;
const { Option } = Select;
const { Panel } = Collapse;

const Exchanges = () => {
  const [coinId, setCoinId] = useState();
  const [coinName, setCoinName] = useState();

  const { data: coins, isFetching } = useGetCryptosQuery(100);
  const { data: exchanges } = useGetCryptoExchangesQuery({
    crypto: coinId,
  });
  const cryptoCoins = coins?.data?.coins;

  if (isFetching) return "Loading";

  return (
    <>
      <Select
        className='select-news'
        placeholder='Select a Crypto'
        onChange={(value, children) => {
          setCoinId(value);
          return setCoinName(children.children);
        }}>
        {cryptoCoins.map((coin) => (
          <Option key={"exchange" + coin.uuid} value={coin.uuid}>
            {coin.name}
          </Option>
        ))}
      </Select>
      <Title className='exchange-title' level={2}>
        {coinName} Exchanges
      </Title>
      <Row>
        <Col span={2}></Col>
        <Col
          className='exchange-header'
          style={{ display: "flex", alignItems: "center" }}
          span={10}>
          Exchange
        </Col>
        <Col
          className='exchange-header'
          style={{ display: "flex", alignItems: "center" }}
          span={5}>
          24h Volume
        </Col>
        <Col
          className='exchange-header'
          style={{ display: "flex", alignItems: "center" }}
          span={6}>
          Recommend
        </Col>
      </Row>
      {exchanges && (
        <Collapse>
          {exchanges?.data?.exchanges.map((exchange, index) => (
            <Panel
              key={exchange + index}
              showArrow={false}
              header={
                <Row justify='start' style={{ width: "100%" }}>
                  <Col className='exchange-list-num' span={2}>
                    {index + 1 + "."}
                  </Col>
                  <Col className='exchange-icons' span={2}>
                    <img src={exchange?.iconUrl} alt='' />
                  </Col>
                  <Col className='exchange-name' span={9}>
                    {exchange?.name}
                  </Col>
                  <Col className='exchange-name' span={5}>
                    {millify(exchange?.["24hVolume"])}
                  </Col>
                  <Col className='exchange-market' span={2}>
                    {exchange?.recommended ? (
                      <CheckCircleTwoTone twoToneColor='#52c41a' />
                    ) : (
                      <CloseCircleTwoTone twoToneColor='#eb2f96' />
                    )}
                  </Col>
                  <Col className='exchange-name' span={4}>
                    <a
                      href={exchange?.coinrankingUrl}
                      target='_blank'
                      rel='noreferrer'>
                      More...
                    </a>
                  </Col>
                </Row>
              }>
              <Row>
                Offered price: $ {millify(exchange?.price, { precision: 3 })}/
                {coinName}
              </Row>
              <Row>Number of markets: {millify(exchange?.numberOfMarkets)}</Row>
            </Panel>
          ))}
        </Collapse>
      )}
    </>
  );
};

export default Exchanges;
