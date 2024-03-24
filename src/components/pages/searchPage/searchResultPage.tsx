import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { StyledPage, StyledHeader } from '../../../styledComponent.ts';
import TitleHeader from '../../ui/header/titleHeader.tsx';
import styled from 'styled-components';
import TabBar from '../../ui/tabBar/tabBar.tsx';

import '../../../asset/sass/pages/searchPage/searchResultPage.scss';
import { BASE_URL } from '../../global/constants/index.ts';
import Plus from '../../../asset/image/plus.svg';
import Warning from '../../../asset/image/warning-triangle.svg';
import { toast } from 'react-toastify';
import '../../../asset/sass/pages/notificationPage/notificationPage.scss';
import SearchInput from '../../ui/searchInput/searchInput.tsx';

const ResultsContainer = styled.div`
  position: relative;
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

const ResultsList = styled.ul`
  padding: 10;
  margin-top: 8%;
  width: 80%;
  margin-left: 10%;
  display: flex;
  flex-direction: column;
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

interface SearchResultProps {
  state: {
    searchResults: {
      companyId: number;
      companyName: string;
      companyType: string;
      questionCount: number;
    }[];
  };
}

function SearchResultPage() {
  const navigate = useNavigate();
  const {
    state: { searchResults },
  } = useLocation() as SearchResultProps;
  const companyList = searchResults.map((result) => result.companyName);
  // const keyword = queryParams.get('keyword');
  // const [searchResult, setSearchResult] = useState<SearchResultProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Array.from(searchResults)?.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const totalPages = Math.ceil(searchResults.length / itemsPerPage);

  const handleGoBack = () => {
    navigate('/search-company');
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${BASE_URL}/api/company?pageNo=1&name=${companyList}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        console.log('respons', response);

        await response.json();
      } catch (error) {
        if (error instanceof Error) toast.error(error.message);
      }
    }

    fetchData();
  }, [location.search]);

  const goToResultDetailPage = (companyId: number) => {
    navigate(`/company-info/${companyId}`);
  };

  const handlePagination = (type: 'prev' | 'next') => {
    if (type === 'prev') {
      setCurrentPage(currentPage - 1);
    } else if (type === 'next') {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <StyledPage className="main-page-container">
      <StyledHeader>
        <ResultsContainer>
          <TitleHeader pageTitle="검색 결과" handleGoBack={handleGoBack} />
          <SearchInput />
          <ResultCount>
            기업 검색 결과
            <span className="result-count">{companyList.length}</span>
          </ResultCount>
          <ResultsList>
            {currentItems.length > 0 ? (
              currentItems.map((data) => (
                <ResultItem
                  key={data.companyId}
                  onClick={() => goToResultDetailPage(data.companyId)}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <span>{data.companyName}</span>
                    <IndustryTag>업종 : {data.companyType}</IndustryTag>
                  </div>
                  <QuestionCount>{data.questionCount}</QuestionCount>
                </ResultItem>
              ))
            ) : (
              <span className="result-data-failed">
                <img
                  className="warning-icon"
                  src={Warning}
                  alt="Warning Icon"
                />
                <div className="failed-text">검색 결과가 없습니다.</div>
                <div className="failed-text2">
                  코버플로우에 원하는 기업을 등록해 주세요
                </div>

                <div className="registContainer">
                  <img className="plus-icon" src={Plus} alt="Plus Icon" />
                  <a href="/company-regist" className="company-registration">
                    기업 등록하기
                  </a>
                </div>
              </span>
            )}
          </ResultsList>
          {totalPages >= 1 && (
            <div className="pagination-button-container">
              <div
                // disabled={currentGroup === 0}
                style={{ cursor: 'pointer' }}
                onClick={() => handlePagination('prev')}
              >
                <svg
                  width="8"
                  height="15"
                  viewBox="0 0 6 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 9L1 5L5 1"
                    stroke="#1D1D1F"
                    strokeWidth="0.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              {[...Array(totalPages)].map((_, index) => (
                <div
                  className={`notice-button ${currentPage === index + 1 ? 'active-item' : ''}`}
                  key={index}
                >
                  {index + 1}
                </div>
              ))}
              <div
                style={{ cursor: 'pointer' }}
                onClick={() => handlePagination('next')}
                // disabled={currentGroup === totalGroup - 1}
              >
                <svg
                  width="8"
                  height="15"
                  viewBox="0 0 6 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 9L5 5L1 1"
                    stroke="#1D1D1F"
                    strokeWidth="0.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          )}
        </ResultsContainer>
        <TabBar />
      </StyledHeader>
    </StyledPage>
  );
}

export default SearchResultPage;
