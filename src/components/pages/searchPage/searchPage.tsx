import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../asset/sass/pages/searchPage/searchPage.scss';
import { StyledPage, StyledHeader } from '../../../styledComponent.js';
import TitleHeader from '../../ui/header/titleHeader.js';
import TabBar from '../../ui/tabBar/tabBar.js';
import SearchInput from '../../ui/searchInput/searchInput';

function SearchPage() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <StyledPage className="main-page-container">
      <StyledHeader>
        <TitleHeader pageTitle="기업 검색" handleGoBack={handleGoBack} />
        <SearchInput />
      </StyledHeader>
      <TabBar />
    </StyledPage>
  );
}

export default SearchPage;
