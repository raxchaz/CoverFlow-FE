import React from 'react';
import Usericon from '../../../asset/image/usericon.svg';
import Alarmicon from '../../../asset/image/alarmicon.svg';
import '../../../asset/sass/etc/tabBar/tabBar.scss';

const TabBar = () => {
  return (
    <nav className="wrapper">
      <div>
        <img className="main-logo" src={Usericon} />
      </div>
      <div>
        <img className="main-logo" src={Alarmicon} />
      </div>
    </nav>
  );
};

export default TabBar;
