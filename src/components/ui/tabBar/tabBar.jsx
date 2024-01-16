import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faBell } from '@fortawesome/free-solid-svg-icons';

const TabContainer = styled.div`
  position: relative;
  bottom: -53%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 60px;
  font-size: 0.8rem;
  background-color: #fff;
  color: #000;
  z-index: 1000;
`;

const TabLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: inherit;
`;

const TabIcon = styled.div`
  margin-bottom: 5px;
`;

const TabBar = () => {
  return (
    <TabContainer>
      <TabLink to="/mypage">
        <TabIcon>
          <FontAwesomeIcon icon={faUser} size="lg" />
        </TabIcon>
        마이페이지
      </TabLink>

      <TabLink to="/">
        <TabIcon>
          <FontAwesomeIcon icon={faHome} size="lg" />
        </TabIcon>
        홈
      </TabLink>

      <TabLink to="/notifications">
        <TabIcon>
          <FontAwesomeIcon icon={faBell} size="lg" />
        </TabIcon>
        알림
      </TabLink>
    </TabContainer>
  );
};

export default TabBar;
