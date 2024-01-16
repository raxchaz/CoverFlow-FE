import React from 'react';
import '../../../asset/sass/etc/header/header.scss';
import Hambar from '../../../asset/image/hambar.svg';

function Header() {
  return (
    <header>
      <img className="hambar" src={Hambar} />
      <a href="/login" className="login-btn">
        로그인 / 가입
      </a>
    </header>
  );
}

export default Header;
