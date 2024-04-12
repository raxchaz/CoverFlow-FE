import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../asset/sass/pages/searchPage/searchPage.scss';
import { StyledPage, StyledHeader } from '../../../styledComponent';
import TitleHeader from '../../ui/header/titleHeader';
import TabBar from '../../ui/tabBar/tabBar';
import SearchInput from '../../ui/searchInput/searchInput';

function SearchPage() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
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
