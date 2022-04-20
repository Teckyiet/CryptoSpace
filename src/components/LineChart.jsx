import React from "react";
import { Row, Col, Typography } from "antd";
import { Line } from "react-chartjs-2";
import {millify} from 'millify'
import {Chart as chartJs} from 'chart.js/auto'

const {Title} = Typography

const LineChart = ({ history, cryptoName, currentPrice, timeStamp }) => {
  const price = [];
  const time = [];

  history?.data?.history.forEach((x) => price.push(x.price));
  timeStamp === "3h" || timeStamp === "24h"
    ? history?.data?.history.forEach((y) =>
        time.push(new Date(y.timestamp * 1000).toLocaleTimeString()),
      )
    : history?.data?.history.forEach((y) =>
        time.push(new Date(y.timestamp * 1000).toLocaleDateString()),
      );

  console.log(time);
  console.log(price);
  console.log(currentPrice);

  const data = {
    labels: time.reverse(),
    datasets: [{
      label: 'Price in USD',
      data: price.reverse(),
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      pointBorderWidth: '0.1'
    }]
  };

  return (
    <Row className="chart-header">
        <Title level={2} className="chart-title">
            {cryptoName} Price Chart
        </Title>
        <Col>
            <Title level={5} className="price-change">Price changed: {history?.data?.change}%</Title>
            <Title level={5} className="current-price">Current {cryptoName} Price: ${millify(currentPrice, {precision: 2})}</Title>
        </Col>
      <Line data={data}></Line>
    </Row>
  );
};

export default LineChart;
