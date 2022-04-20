import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Layout, Typography, Space } from "antd";
import {
  Navbar,
  Homepage,
  Exchanges,
  Cryptocurrency,
  CryptoDetails,
  News,
} from "./components";
import "./App.css";

const App = () => {
  return (
    <div className='app'>
      <div className='Navbar'>
        <Navbar></Navbar>
      </div>
      <div className='main'>
        <Layout>
          <div className='routes'>
            <Routes>
              <Route path='/CryptoSpace/' element={<Homepage />}></Route>
              <Route path='/CryptoSpace/exchanges' element={<Exchanges />}></Route>
              <Route
                path='/CryptoSpace/cryptocurrency'
                element={<Cryptocurrency />}></Route>
              <Route
                path='/crypto/:coinUuid'
                element={<CryptoDetails />}></Route>
              <Route path='/CryptoSpace/news' element={<News />}></Route>
            </Routes>
          </div>
        </Layout>
        <div className='footer'>
          <Typography.Title
            level={5}
            style={{ color: "white", textAlign: "center" }}>
            CryptoVerse <br />
            All rights reserves
          </Typography.Title>
          <Space>
            <Link to='/CryptoSpace/'>Home</Link>
            <Link to='/CryptoSpace/exchanges'>Exchanges</Link>
            <Link to='/CryptoSpace/news'>News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default App;
