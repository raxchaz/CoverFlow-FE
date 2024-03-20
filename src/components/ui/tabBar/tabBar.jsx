import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../../asset/sass/etc/tabBar/tabBar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import { ACCESS_TOKEN } from '../../global/constants/index.ts';

const TabBar = () => {
  const [activeNav, setActiveNav] = useState(1);
  const [showTabBar, setShowTabBar] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
      setShowTabBar(false);
    } else {
      setShowTabBar(true);
    }
    switch (location.pathname) {
      case '/':
        setActiveNav(1);
        break;
      case '/mypage':
        setActiveNav(2);
        break;
      case '/notification':
        setActiveNav(3);
        break;
      default:
        break;
    }
  }, [location]);

  if (!showTabBar) {
    return null;
  }

  return (
    <nav className="wrapper" style={{ width: '700px', margin: '0 auto' }}>
      <div style={{ width: '33.33%' }}>
        <Link to="/" className="nav-link" onClick={() => setActiveNav(1)}>
          <div className={activeNav === 1 ? 'nav-item tab-active' : 'nav-item'}>
            <FontAwesomeIcon icon={faHouse} className="icon" />
            <div className="text">홈</div>
          </div>
        </Link>
      </div>

      <div style={{ width: '33.33%' }}>
        <Link to="/mypage" className="nav-link" onClick={() => setActiveNav(2)}>
          <div className={activeNav === 2 ? 'nav-item tab-active' : 'nav-item'}>
            <FontAwesomeIcon icon={faUser} className="icon" />
            <div className="text">마이페이지</div>
          </div>
        </Link>
      </div>

      <div style={{ width: '33.33%' }}>
        <Link
          to="/notification"
          className="nav-link"
          onClick={() => setActiveNav(3)}
        >
          <div className={activeNav === 3 ? 'nav-item tab-active' : 'nav-item'}>
            <FontAwesomeIcon icon={faBell} className="icon" />
            <div className="text">알림</div>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default TabBar;
