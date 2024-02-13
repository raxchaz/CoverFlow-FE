import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Searchicon from '../../../asset/image/searchicon.svg';
import Plus from '../../../asset/image/plus.svg';
import Warning from '../../../asset/image/warning.svg';
import { BASE_URL } from '../../global/constants/index.js';
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

  // 유효한 문자열 검사 (한글, 영문, 숫자)
  const isSyllable = (character) => {
    const syllableRegex = /^[가-힣a-zA-Z0-9]$/;
    const result = syllableRegex.test(character);
    console.log('글자 유효성 검사 결과', { character, result });
    return syllableRegex.test(character);
  };

  // 입력값 변경 핸들러
  const handleInputChange = (event) => {
    const newInputValue = event.target.value.trim();
    console.log('입력값 변경됨', newInputValue);
    setSearchCompany(newInputValue);
    setActiveIndex(-1);

    if (newInputValue.length > 0) {
      const lastCharacter = newInputValue.slice(-1);
      if (isSyllable(lastCharacter)) {
        fetchAutoCompleteData(newInputValue);
      } else {
        setAutoCompleteValue([]);
      }
    } else {
      setAutoCompleteValue([]);
    }
  };

  // 자동완성 데이터 요청
  const fetchAutoCompleteData = (query) => {
    console.log('자동완성 데이터 요청 중', query);
    axios
      .get(`${BASE_URL}/api/company/auto-complete?name=${query}`)
      .then((response) => {
        console.log('자동완성 데이터 응답', response.data);
        setAutoCompleteValue(response.data.data);
      })
      .catch((error) => {
        console.error('자동완성 데이터를 가져오기 실패', error);
        setAutoCompleteValue([]);
      });
  };

  // 자동 완성 내역 저장 함수
  const saveAutoCompleteHistory = async (searchText) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/company/auto-complete`,
        { searchText },
      );
      console.log('자동완성 내역 저장 결과:', response.data);
    } catch (error) {
      console.error('자동완성 내역 저장 중 오류 발생:', error);
    }
  };

  // 검색 함수
  const handleSearch = async () => {
    setSearchInitiated(true);

    try {
      // 사용자가 방향키로 특정 자동완성 항목을 선택하지 않고,
      // 자동완성 목록이 있을 경우엔 전체 데이터를 결과 페이지로 전달합니다.
      if (activeIndex === -1 && autoCompleteValue.length > 0) {
        console.log('자동완성 값:', autoCompleteValue);

        navigate('/search-result', {
          state: { searchResult: autoCompleteValue },
        });
      }
      // 사용자가 방향키로 특정 자동완성 항목을 선택한 경우에 특정 항목만 결과 페이지로 전달합니다.
      else if (activeIndex >= 0 && autoCompleteValue[activeIndex]) {
        console.log('선택된 자동완성 값:', autoCompleteValue[activeIndex]);
        navigate('/search-result', {
          state: { searchResult: [autoCompleteValue[activeIndex]] },
        });
      }

      // 사용자가 입력한 검색어로 검색을 진행할 경우
      else {
        const response = await axios.post(
          `${BASE_URL}/api/company/search-companies`,
          { name: searchCompany },
        );
        console.log('검색 결과', response.data);

        if (response.status === 200 && response.data.length > 0) {
          const searchDataWithQuestionsCount = response.data.map((company) => ({
            ...company,
            questionsCount: company.questionsCount || 0,
          }));
          console.log(
            '검색 결과 (질문 수 포함):',
            searchDataWithQuestionsCount,
          );

          navigate('/search-result', {
            state: { searchResult: searchDataWithQuestionsCount },
          });
        } else {
          setSearchResult([]);
        }

        // 검색 내역 저장
        saveAutoCompleteHistory(searchCompany);
      }
    } catch (error) {
      console.error('검색 중 오류 발생', error);
      setSearchResult([]);
    }
  };

  // 자동완성 선택 함수
  const selectAutoCompleteValue = (value) => {
    setSearchCompany(value);
    setAutoCompleteValue([]);
    handleSearch();
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  /* ===============================================================  */

  return (
    <>
      <StyledPage className="main-page-container">
        <StyledHeader>
          <TitleHeader pageTitle="기업 검색" handleGoBack={handleGoBack} />

          <SearchInput
            type="text"
            className="search-input-text"
            placeholder="기업 명을 검색하세요"
            value={searchCompany}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (
                e.key === 'ArrowDown' &&
                activeIndex < autoCompleteValue.length - 1
              ) {
                e.preventDefault();
                setActiveIndex(activeIndex + 1);
              } else if (e.key === 'ArrowUp' && activeIndex > 0) {
                e.preventDefault();
                setActiveIndex(activeIndex - 1);
              } else if (e.key === 'Enter') {
                e.preventDefault();
                if (activeIndex >= 0 && autoCompleteValue[activeIndex]) {
                  selectAutoCompleteValue(autoCompleteValue[activeIndex].name);
                } else {
                  handleSearch();
                }
              }
            }}
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
            {searchInitiated &&
              (searchResult.length > 0 ? (
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
                    코버플로우에 원하는 기업을 등록해 주세요
                  </div>
                  <span className="registration-container">
                    <img className="plus-icon" src={Plus} alt="Plus Icon" />
                    <a href="/company-regist" className="company-registration">
                      기업 등록하기
                    </a>
                  </span>
                </span>
              ))}
          </div>
        </StyledHeader>
        <TabBar />
      </StyledPage>
    </>
  );
}

export default SearchPage;
