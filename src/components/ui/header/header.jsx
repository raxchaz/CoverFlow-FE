import React, { useState, useEffect, useRef } from 'react';
import SideBar from './sideBar';
import Hambar from '../../../asset/image/hambar.svg';
import '../../../asset/sass/etc/header/header.scss';

function Header() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const headerRef = useRef(null);

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  const handleClickOutside = (event) => {
    if (headerRef.current && !headerRef.current.contains(event.target)) {
      setIsSideBarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <>
      <header ref={headerRef}>
        <div className="sidebar-wrapper">{isSideBarOpen && <SideBar />}</div>
        <img
          className="hambar"
          src={Hambar}
          alt="메뉴"
          onClick={toggleSideBar}
        />
      </header>
    </>
  );
}

export default Header;
