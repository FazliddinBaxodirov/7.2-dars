import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, MinusOutlined, ProductOutlined, SettingOutlined } from '@ant-design/icons';
import logo from '../assets/logo.png'
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
const items = [
  {
    key: '1',
    icon: <ProductOutlined className='scale-[1.5]'/>,
    label: <p className='text-[22px]'>Products</p>,
    children: [
      {
        key: '11',
        label: <Link to={'/'}>Products</Link>,
        icon:<MinusOutlined />,
      }
    ],
  }
];
const getLevelKeys = (items1) => {
  const key = {};
  const func = (items2, level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};
const levelKeys = getLevelKeys(items);
const Header = () => {
  const [stateOpenKeys, setStateOpenKeys] = useState(['2', '23']);
  const onOpenChange = (openKeys) => {
    const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);
    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
      setStateOpenKeys(
        openKeys
          // remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
      );
    } else {
      setStateOpenKeys(openKeys);
    }
  };
  return (
    <div className='h-[100vh] '>
        <div className='flex items-center bg-[#001529] h-[12%]'>
            <img src={logo} alt="logo" width={100} height={100} />
            <p className='text-white text-[30px]'>Products</p>
        </div>
        <Menu
          theme='dark'
          mode="inline"
          defaultSelectedKeys={['231']}
          openKeys={stateOpenKeys}
          onOpenChange={onOpenChange}
          style={{
            width: "100%",
            height:"88%"
          }}
          items={items}
        />
    </div>
  );
};
export default Header;