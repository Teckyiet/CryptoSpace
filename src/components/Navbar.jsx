import React, { useState, useEffect } from "react";
import { Menu, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import icon from "../images/cryptocurrency.png";

const Navbar = () => {
  const [screenSize, setScreenSize] = useState(null);
  const [activeMenu, setAciveMenu] = useState(false);

  useEffect(() => {
    const handleResize = () => { setScreenSize(window.innerWidth) }
    window.addEventListener("resize", () => {handleResize()});
    handleResize()
    return window.removeEventListener('resize', () => {handleResize()})
  }, []);

  useEffect(() => {
    if (screenSize > 768) {
      setAciveMenu(true);
    } else {
      setAciveMenu(false);
    }
  }, [screenSize]);

  return (
    <div className='nav-container'>
      <div className='logo-container'>
        <Avatar src={icon} size='large'></Avatar>
        <Typography.Title level={2} className='logo'>
          <Link to='/CryptoSpace/'>CryptoSpace</Link>
        </Typography.Title>
      </div>
      <button
        className='menu-control-container'
        onClick={() => setAciveMenu(!activeMenu)}>
        <MenuOutlined />
      </button>
      {activeMenu && (
        <Menu theme='dark'>
          <Menu.Item icon={<HomeOutlined />}>
            <Link to='/CryptoSpace/'>Home</Link>
          </Menu.Item>
          <Menu.Item icon={<FundOutlined />}>
            <Link to='/CryptoSpace/cryptocurrency'>Cryptocurrency</Link>
          </Menu.Item>
          <Menu.Item icon={<MoneyCollectOutlined />}>
            <Link to='/CryptoSpace/exchanges'>Exchanges</Link>
          </Menu.Item>
          <Menu.Item icon={<BulbOutlined />}>
            <Link to='/CryptoSpace/news'>News</Link>
          </Menu.Item>
        </Menu>
      )}
    </div>
  );
};

export default Navbar;
