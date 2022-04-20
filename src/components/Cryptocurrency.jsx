import React, { useEffect, useState } from "react";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Row, Col, Card, Input } from "antd";
import { Link } from "react-router-dom";
import millify from "millify";

const Cryptocurrency = ({ simplified }) => {
  const count = simplified ? 10 : 100;

  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);

  const [cryptoCoins, setCryptoCoins] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filteredCoin = cryptoList?.data?.coins.filter((coin) => {
      return coin.name.toLowerCase().includes(searchTerm);
    });
    setCryptoCoins(filteredCoin);
  }, [cryptoList, searchTerm]);

  if (isFetching) return "Loading...";

  return (
    <>
      {!simplified && (
        <div>
          <input
            style={{
              display: "block",
              margin: "16px auto",
              width: "min(40vw, 250px)",
            }}
            placeholder='Search cryptocurrency'
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className='crypro-cards-container'>
        {cryptoCoins?.map((coin) => (
          <Col xs={24} sm={12} lg={6} className='crypto-card' key={coin.uuid}>
            <Link to={`/crypto/${coin.uuid}`}>
              <Card
                title={`${coin.rank}. ${coin.name}`}
                extra={<img className='crypto-image' src={coin.iconUrl} />}
                hoverable>
                <p>
                  Price: $
                  {millify(coin.price, { precision: 2, decimalSeparator: "," })}
                </p>
                <p>Market Cap: {millify(coin.marketCap)}</p>
                <p>Daily Change: {millify(coin.change, { precision: 2 })}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrency;
