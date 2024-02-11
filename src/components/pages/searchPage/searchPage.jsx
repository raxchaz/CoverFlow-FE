import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Searchicon from '../../../asset/image/searchicon.svg';
import Plus from '../../../asset/image/plus.svg';
import Warning from '../../../asset/image/warning.svg';
import { BASE_URL } from '../loginPage/constants';
import '../../../asset/sass/pages/searchPage/searchPage.scss';
import { StyledPage, StyledHeader } from '../../../styledComponent.js';
import TitleHeader from '../../ui/header/titleHeader.jsx';
import TabBar from '../../ui/tabBar/tabBar.jsx';

const SearchInput = styled.input`
  width: 300px;
  height: 20px;
  padding: 8px;
  border: 1px solid #f2f2f2;
  background-color: #f2f2f2;
  border-radius: 10px;
  margin: 10% 0% 0% 13%;
  outline: none;

  &:focus {
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
  }

  &::placeholder {
    color: #c0c0c0;
    font-size: 0.8rem;
  }
`;

const AutoCompleteContainer = styled.div`
  position: absolute;
  background-color: #fefefe;
  width: 315px;
  letter-spacing: -1px;
  margin-left: 13%;
  margin-top: 1%;
  border-radius: 0 0 10px 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  max-height: 300px;
  overflow-y: auto;
`;

const AutoCompleteItem = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f2f2f2;
  }
`;

function SearchPage() {
  const navigate = useNavigate();
  const [searchCompany, setSearchCompany] = useState('');
  const [autoCompleteValue, setAutoCompleteValue] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [searchInitiated, setSearchInitiated] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSearch = () => {
    setSearchInitiated(true);
    axios
      .post(`${BASE_URL}/api/company/search-companies`, {
        name: searchCompany,
      })
      .then((response) => {
        if (response.status === 200) {
          setSearchResult(response.data);
        } else if (response.status === 404) {
          setSearchResult([]);
        }
      })
      .catch((error) => {
        console.error(error);
        setSearchResult([]);
      });
  };

  const handleInputChange = (event) => {
    const newInputValue = event.target.value.trim();
    setSearchCompany(newInputValue);
    setActiveIndex(-1);

    if (newInputValue.length > 0) {
      // 예시 데이터, 실제로는 서버 요청을 통해 데이터를 받아올 것
      const simulatedResponse = [
        { name: '조만제바보' },
        { name: '조만제삼자' },
        { name: '조만두123' },
        { name: '조맹구를르르' },
        { name: '조만지' },
      ];
      const filteredResponse = simulatedResponse.filter((item) =>
        item.name.includes(newInputValue),
      );
      setAutoCompleteValue(filteredResponse);
    } else {
      setAutoCompleteValue([]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prevIndex) => (prevIndex + 1) % autoCompleteValue.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(
        (prevIndex) =>
          (prevIndex - 1 + autoCompleteValue.length) % autoCompleteValue.length,
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0) {
        setSearchCompany(autoCompleteValue[activeIndex].name);
        setAutoCompleteValue([]);
        handleSearch();
      }
    }
  };

  const selectAutoCompleteValue = (value) => {
    setSearchCompany(value);
    setAutoCompleteValue([]);
    setActiveIndex(-1); // 선택 후 인덱스 초기화
  };

  return (
    <StyledPage className="main-page-container">
      <StyledHeader>
        <TitleHeader pageTitle="기업 검색" handleGoBack={handleGoBack} />
        <SearchInput
          type="text"
          className="search-input-text"
          placeholder="기업 명을 검색하세요"
          value={searchCompany}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <img
          className="search"
          src={Searchicon}
          onClick={handleSearch}
          alt="Search"
        />
        {autoCompleteValue.length > 0 && (
          <AutoCompleteContainer>
            {autoCompleteValue.map((value, index) => (
              <AutoCompleteItem
                key={index}
                onClick={() => selectAutoCompleteValue(value.name)}
                style={
                  index === activeIndex ? { backgroundColor: '#f2f2f2' } : {}
                }
              >
                {value.name}
              </AutoCompleteItem>
            ))}
          </AutoCompleteContainer>
        )}
        <div>
          {searchInitiated ? (
            searchResult && searchResult.length > 0 ? (
              searchResult.map((company) => (
                <div className="result-data-complete" key={company.id}>
                  {company.name}
                </div>
              ))
            ) : (
              <span className="result-data-failed">
                <img
                  className="warning-icon"
                  src={Warning}
                  alt="Warning Icon"
                />
                <div className="failed-text">검색 결과가 없습니다</div>
                <div className="failed-text2">
                  커버플로우에 원하는 기업을 등록해주세요
                </div>
                <span className="registration-container">
                  <img
                    className="registration-icon"
                    src={Plus}
                    alt="Plus Icon"
                  />
                  <a href="/company-regist" className="company-registration">
                    기업 등록하기
                  </a>
                </span>
              </span>
            )
          ) : null}
        </div>
        <TabBar />
      </StyledHeader>
    </StyledPage>
  );
}

export default SearchPage;
