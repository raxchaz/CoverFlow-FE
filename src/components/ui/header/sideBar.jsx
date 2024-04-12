import React from 'react';
import { Link } from 'react-router-dom';
import '../../../asset/sass/etc/header/sideBar.scss';
import Sidenotice from '../../../asset/image/sidenotice.svg';
import Feedback from '../../../asset/image/feedback.svg';
import Sideevent from '../../../asset/image/sideevent.svg';
import PropTypes from 'prop-types';

function SideBar({ setIsSideBarOpen }) {
  const handleContentClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div className="sidebar" onMouseDown={() => setIsSideBarOpen(false)}>
      <div className="sidebar-content" onMouseDown={handleContentClick}>
        <div className="sidebar-info">
          <div className="logo-title">기업 Q&A 서비스</div>
          <div className="logo-subtitle">COVERFLOW</div>
        </div>
        <ul className="sidebar-menu">
          <li className="menu-item">
            {' '}
            <Link to="/notice" className="menu-link">
              <img className="sideitem" src={Sidenotice} />
              공지사항
            </Link>
          </li>
          <li className="menu-item" onClick={() => alert('준비중입니다.')}>
            {' '}
            {/* <Link to="/event"> */}
            <div className="menu-link">
              <img className="sideitem" src={Sideevent} />
              이벤트
            </div>
            {/* </Link> */}
          </li>
          <li className="menu-item">
            {' '}
            <Link to="/feedback" className="menu-link">
              <img className="sideitem" src={Feedback} />
              피드백 남기기
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
SideBar.propTypes = {
  setIsSideBarOpen: PropTypes.func.isRequired,
};

export default SideBar;
