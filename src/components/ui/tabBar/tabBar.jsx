import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../../asset/sass/etc/tabBar/tabBar.scss';
// import { ACCESS_TOKEN } from '../../global/constants/index.ts';
import user from '../../../asset/image/tabbar-user.svg';
import home from '../../../asset/image/tabbar-home.svg';
import alert from '../../../asset/image/tabbar-alert.svg';
import newAlert from '../../../asset/image/tabbar-new-alert.svg';

import { useSelector } from 'react-redux';

const TabBar = () => {
  const [activeNav, setActiveNav] = useState(1);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isNewAlert = useSelector((state) => state.alert.count);

  useEffect(() => {
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

  if (!isLoggedIn) {
    return null;
  }

  return (
    <nav className="wrapper" style={{ width: '700px', margin: '0 auto' }}>
      <div style={{ width: '33.33%' }}>
        <Link to="/mypage" className="nav-link" onClick={() => setActiveNav(2)}>
          <div className={activeNav === 2 ? 'nav-item tab-active' : 'nav-item'}>
            <img src={user} alt="user" className="icon" />
            <div className="text">마이페이지</div>
          </div>
        </Link>
      </div>

      <div style={{ width: '33.33%' }}>
        <Link to="/" className="nav-link" onClick={() => setActiveNav(1)}>
          <div className={activeNav === 1 ? 'nav-item tab-active' : 'nav-item'}>
            <img src={home} alt="home" className="icon" />
            <div className="text">홈</div>
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
            {isNewAlert > 0 && (
              <img src={newAlert} alt="new alert" className="icon-overlay" />
            )}
            <img src={alert} alt="alert" className="icon" />
            <div className="text">알림</div>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default TabBar;
