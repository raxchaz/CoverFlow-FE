import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Back from '../../../asset/image/back.svg';
import Searchicon from '../../../asset/image/searchicon.svg';
import { BASE_URL } from '../loginPage/constants';
import '../../../asset/sass/pages/mainPage/searchPage.scss';

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

  const isSyllable = (character) => {
    const syllableRegex = /^[가-힣a-zA-Z0-9]$/; // 음절 정규표현식
    return syllableRegex.test(character);
  };

  const handleSearch = () => {
    axios
      .post(`${BASE_URL}/api/company/search-companies`, {
        name: searchCompany,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleInputChange = (event) => {
    const newInputValue = event.target.value;
    setSearchCompany(newInputValue);

    if (newInputValue.length > 0) {
      const lastCharacter = newInputValue.slice(-1);

      if (isSyllable(lastCharacter)) {
        axios
          .get(`${BASE_URL}/api/company/auto-complete?query=${lastCharacter}`)
          .then((response) => {
            setAutoCompleteValue(response.data); // Update autocomplete results
          })
          .catch((error) => {
            console.error('Failed to fetch autocomplete data', error);
          });
      }
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

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
      <div className="autoCompleteValue-style">
        {autoCompleteValue.map((value) => (
          <option key={value.name}>{value.name}</option>
        ))}
      </div>
    </StyledSearchPage>
  );
}

export default SearchPage;
