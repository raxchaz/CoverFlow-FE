import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../asset/sass/etc/header/header.scss';
import Hambar from '../../../asset/image/hambar.svg';
import Loginuser from '../../../asset/image/loginuser.svg';
import { ACCESS_TOKEN } from '../../pages/loginPage/constants/index.js';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    setIsLoggedIn(!!token);
  }, []);

  const handleUserIconClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMenuClick = (menu) => {
    if (menu === '마이페이지') {
      navigate('/mypage');
    } else if (menu === '상점') {
      navigate('/store');
    } else if (menu === '로그아웃') {
      localStorage.removeItem(ACCESS_TOKEN);
      setIsLoggedIn(false);
      setIsDropdownOpen(false);
    }
  };

  return (
    <header>
      <img className="hambar" src={Hambar} alt="메뉴" />
      {isLoggedIn ? (
        <>
          <img
            className="loginuser"
            src={Loginuser}
            alt="로그인 유저 아이콘"
            onClick={handleUserIconClick}
          />
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <ul>
                <li
                  className="dropdown-item"
                  onClick={() => handleMenuClick('마이페이지')}
                >
                  마이페이지
                </li>
                <hr className="dropdown-divider" />
                <li
                  className="dropdown-item"
                  onClick={() => handleMenuClick('상점')}
                >
                  상점
                </li>
                <hr className="dropdown-divider" />
                <li
                  className="dropdown-item"
                  onClick={() => handleMenuClick('로그아웃')}
                >
                  로그아웃
                </li>
              </ul>
            </div>
          )}
        </>
      ) : (
        <a href="/login" className="login-btn">
          로그인 / 가입
        </a>
      )}
    </header>
  );
}

export default Header;
