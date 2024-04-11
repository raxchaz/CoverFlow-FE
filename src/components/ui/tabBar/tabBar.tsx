import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../../asset/sass/etc/tabBar/tabBar.scss';
// import { ACCESS_TOKEN } from '../../global/constants';
import user from '../../../asset/image/tabbar-user.svg';
import home from '../../../asset/image/tabbar-home.svg';
import alert from '../../../asset/image/tabbar-alert.svg';
import { useSelector } from 'react-redux';
interface RootState {
  user: {
    isLoggedIn: boolean;
  };
}
const TabBar = () => {
  const [activeNav, setActiveNav] = useState(1);
  // const [showTabBar, setShowTabBar] = useState(true);
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

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
            <img src={home} alt="user" className="icon" />{' '}
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
            <img src={alert} alt="user" className="icon" />{' '}
            <div className="text">알림</div>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default TabBar;
