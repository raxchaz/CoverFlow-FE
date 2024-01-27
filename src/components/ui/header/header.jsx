import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../asset/sass/etc/header/header.scss';
import Hambar from '../../../asset/image/hambar.svg';
import Loginuser from '../../../asset/image/loginuser.svg';
import { ACCESS_TOKEN } from '../../pages/loginPage/constants/index.js';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    setIsLoggedIn(!!token);
  }, []);

  const handleUserIconClick = () => {
    navigate('/mypage');
  };

  return (
    <header>
      <img className="hambar" src={Hambar} alt="메뉴" />
      {isLoggedIn ? (
        <img
          className="loginuser"
          src={Loginuser}
          alt="로그인 유저 아이콘"
          onClick={handleUserIconClick}
        />
      ) : (
        <a href="/login" className="login-btn">
          로그인 / 가입
        </a>
      )}
    </header>
  );
}

export default Header;
