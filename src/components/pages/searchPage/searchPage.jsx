import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Back from '../../../asset/image/back.svg';
import Searchicon from '../../../asset/image/searchicon.svg';
import Plus from '../../../asset/image/plus.svg';
import Warning from '../../../asset/image/warning.svg';
import { BASE_URL } from '../loginPage/constants';
import '../../../asset/sass/pages/searchPage/searchPage.scss';

const StyledSearchPage = styled.div`
  position: relative;
  height: 100vh;
  background-color: #ffffff;
`;

const SearchHeading = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1rem;
  margin-top: 10%;
  letter-spacing: -1px;
  font-weight: 600;
`;

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

function SearchPage() {
  const navigate = useNavigate();
  const [searchCompany, setSearchCompany] = useState('');
  const [autoCompleteValue, setAutoCompleteValue] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [searchInitiated, setSearchInitiated] = useState(false);

  /* 뒤로가기 버튼을 눌렀을 때, 한 페이지 뒤로 가는 로직입니다. */
  const handleGoBack = () => {
    navigate(-1);
  };

  /*  엔터 키를 누르거나, 검색 아이콘을 눌렀을 경우에 검색어를 서버로 전달하는 로직입니다.  */
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

  /*
      사용자가 검색 입력 필드에 텍스트를 입력할 때마다 이벤트가 발생하는 로직입니다.

      1. 사용자의 새로운 입력값을 추출하여, searchCompany에 저장합니다.
      2.  if문을 이용해서 사용자가 한 글자 이상의 음절을 입력했을 때에만 이벤트가 발생하도록 했습니다.
      3. 마지막 문자가 정규표현식에서 정의한 문자가 맞는지 확인합니다. 
      4. 마지막 문자가 유효한 경우에만 Axios를 사용해서 서버에 자동 완성 데이터를 요청합니다.
      5. 응답 데이터인 response.data는 autoCompleteValue에 저장하여, 사용자에게 자동 완성 옵션을 보여줍니다!
  */

  const handleInputChange = (event) => {
    const newInputValue = event.target.value;
    setSearchCompany(newInputValue);

    if (newInputValue.length > 0) {
      const lastCharacter = newInputValue.slice(-1);

      if (isSyllable(lastCharacter)) {
        axios
          .get(`${BASE_URL}/api/company/auto-complete?query=${lastCharacter}`)
          .then((response) => {
            setAutoCompleteValue(response.data);
          })
          .catch((error) => {
            console.error(
              '자동완성 데이터를 가지고 오는 데 실패했어요.',
              error,
            );
          });
      }
    }
  };

  /* 
    음절 정규표현식을 사용하여, 자음과 모음의 단일 형태가 아닌
    음절 형태일 경우에만 글자가 서버로 전송되도록 구현했습니다.
   */
  const isSyllable = (character) => {
    const syllableRegex = /^[가-힣a-zA-Z0-9]$/;
    return syllableRegex.test(character);
  };

  /* ===============================================================  */

  return (
    <StyledSearchPage className="main-page-container">
      <SearchHeading>
        <img
          className="back"
          src={Back}
          onClick={handleGoBack}
          alt="뒤로 가기"
        />
        <span>검색</span>
      </SearchHeading>
      <SearchInput
        type="text"
        className="search-input-text"
        placeholder="기업 명을 검색하세요"
        value={searchCompany}
        onChange={handleInputChange}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
      />
      <img
        className="search"
        src={Searchicon}
        onClick={handleSearch}
        alt="Search"
      />

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
              <img className="warning-icon" src={Warning} alt="SVG 이미지" />
              <div className="failed-text">검색 결과가 없습니다</div>
              <div className="failed-text2">
                커버플로우에 원하는 기업을 등록해주세요
              </div>
              <span className="registration-container">
                <img
                  className="registration-icon"
                  src={Plus}
                  alt="SVG 이미지"
                />
                <a href="/company-regist" className="company-registration">
                  기업 등록하러 가기
                </a>
              </span>
            </span>
          )
        ) : null}
      </div>

      <div className="autoCompleteValue-style">
        {autoCompleteValue.map((value) => (
          <option key={value.name}>{value.name}</option>
        ))}
      </div>
    </StyledSearchPage>
  );
}

export default SearchPage;
