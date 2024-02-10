import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../asset/sass/pages/searchPage/companyRegistPage.scss';
import { ACCESS_TOKEN } from '../../pages/loginPage/constants/index.js';
import { StyledPage, StyledHeader } from '../../../styledComponent.js';
import TitleHeader from '../../ui/header/titleHeader.jsx';

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
    <StyledPage className="main-page-container">
      <StyledHeader>
        <TitleHeader pageTitle="기업 등록" handleGoBack={handleGoBack} />
        <input type="text" className="input-field" placeholder="입력란 1" />
        <input type="text" className="input-field" placeholder="입력란 2" />
        <input type="text" className="input-field" placeholder="입력란 3" />
        <input type="text" className="input-field" placeholder="입력란 4" />
      </StyledHeader>
    </StyledPage>
  );
}

export default CompanyRegistPage;
