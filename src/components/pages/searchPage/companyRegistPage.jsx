import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Back from '../../../asset/image/back.svg';
import '../../../asset/sass/pages/searchPage/companyRegistPage.scss';
import { ACCESS_TOKEN } from '../../pages/loginPage/constants/index.js';

const StyledCompanyRegistPage = styled.div`
  position: relative;
  height: 100vh;
  background-color: #ffffff;
`;

const CompanyRegistHeading = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1rem;
  margin-top: 10%;
  letter-spacing: -1px;
  font-weight: 600;
`;

function CompanyRegistPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    if (!token) {
      localStorage.setItem('companyRegistPageURL', '/company-regist');
      navigate('/login');
    }
  }, [navigate]);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <StyledCompanyRegistPage className="main-page-container">
      <CompanyRegistHeading>
        <img
          className="back"
          src={Back}
          onClick={handleGoBack}
          alt="뒤로 가기"
        />
        <span className="title">기업 등록</span>
      </CompanyRegistHeading>

      <input type="text" className="input-field" placeholder="입력란 1" />
      <input type="text" className="input-field" placeholder="입력란 2" />
      <input type="text" className="input-field" placeholder="입력란 3" />
      <input type="text" className="input-field" placeholder="입력란 4" />
    </StyledCompanyRegistPage>
  );
}

export default CompanyRegistPage;
