import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { StyledPage, StyledHeader } from '../../../styledComponent.js';
import TitleHeader from '../../ui/header/titleHeader.jsx';
import styled from 'styled-components';
import TabBar from '../../ui/tabBar/tabBar.jsx';
import SearchInput from '../../ui/searchInput/searchInput.jsx';
import '../../../asset/sass/pages/searchPage/searchResultPage.scss';

const ResultsContainer = styled.div`
  position: relative;
  height: 100vh;
  background-color: #ffffff;
`;

const ResultItem = styled.li`
  font-size: 18px;
  letter-spacing: -1px;
  list-style: none;
  padding: 20px 20px;
  background-color: #ffffff;
  border: 1.5px solid #eaeaea;
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.05),
    0 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  margin-bottom: 15px;

  &:hover {
    background-color: #f9f9f9;
    border-color: #d1d1d1;
    border: 2px solid cecece;
    box-shadow:
      0 2px 4px rgba(0, 0, 0, 0.08),
      0 4px 6px rgba(0, 0, 0, 0.1);
  }

  &::after {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    width: 6px;
    height: 6px;
    background-color: #007bff;
    border-radius: 50%;
  }
`;

const IndustryTag = styled.span`
  color: #9b9898;
  font-size: 12px;
  margin: 10% 0% 0% -1%;
`;

const Line = styled.div`
  height: 13px;
  background-color: #f2f2f2;
  width: 103%;
  margin: 6% 0% 0% -1.5%;
`;

const ResultsList = styled.ul`
  padding: 10;
  margin-top: 8%;
  width: 80%;
  margin-left: 10%;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const ResultCount = styled.div`
  letter-spacing: -1px;
  margin: 9% 0% -3% 11%;
  color: #333;
  font-size: 14px;
  font-weight: 600;
`;

const QuestionCount = styled.div`
  font-size: 16px;
  text-align: center;
  flex-shrink: 0;
  color: #428238;
  font-weight: 600;

  &::before {
    content: '질문 수';
    display: block;
    font-size: 0.8em;
    color: #6c757d;
    margin-bottom: 10%;
    font-weight: 400;
  }

  &::after {
    content: '';
    display: block;
    height: 1px;
  }
`;

function SearchResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { searchResult } = location.state || {};

  const handleGoBack = () => {
    navigate(-1);
  };

  const goToResultDetailPage = (companyId) => {
    navigate(`/company-info`, {
      state: { companyId },
    });
  };

  return (
    <StyledPage className="main-page-container">
      <StyledHeader>
        <ResultsContainer>
          <TitleHeader pageTitle="검색" handleGoBack={handleGoBack} />
          <SearchInput />
          <Line />
          <ResultCount>
            기업 검색 결과{' '}
            <span className="result-count"> {searchResult.length}</span>
          </ResultCount>
          {searchResult && searchResult.length > 0 && (
            <ResultsList>
              {searchResult.map((company, index) => (
                <ResultItem
                  key={company.id}
                  onClick={() => goToResultDetailPage(company.id)}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <span>{company.name}</span>
                    <IndustryTag>{company.industry || 'IT / 통신'}</IndustryTag>
                  </div>
                  <QuestionCount>{company.questionCount}</QuestionCount>
                </ResultItem>
              ))}
            </ResultsList>
          )}
        </ResultsContainer>
        <TabBar />
      </StyledHeader>
    </StyledPage>
  );
}

export default SearchResultPage;
