import React from 'react';
import { Link } from 'react-router-dom';
import '../../../asset/sass/etc/header/sideBar.scss';
import Sidenotice from '../../../asset/image/sidenotice.svg';
import Feedback from '../../../asset/image/feedback.svg';
import Sideevent from '../../../asset/image/sideevent.svg';

function SideBar() {
  return (
    <div className="sidebar">
      <div className="sidebar-info">
        안녕하세요
        <br /> 기업 정보 QNA 서비스 <br />
        코버플로우입니다
      </div>
      <ul className="sidebar-menu">
        <li className="menu-item">
          {' '}
          <Link to="/notice">
            <img className="sideitem" src={Sidenotice} />
            공지사항
          </Link>
        </li>
        <li className="menu-item">
          {' '}
          <Link to="/feedback">
            <img className="sideitem" src={Feedback} />
            피드백 남기기
          </Link>
        </li>
        <li className="menu-item">
          {' '}
          <Link to="/event">
            <img className="sideitem" src={Sideevent} />
            이벤트
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
