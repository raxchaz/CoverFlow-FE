import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../../asset/sass/etc/searchInput/searchInput.scss';
import styled from 'styled-components';
import Searchicon from '../../../asset/image/searchicon.svg';
import { BASE_URL } from '../../global/constants/index.js';

const StyledSearchInput = styled.input`
  width: 350px;
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
  width: 361px;
  letter-spacing: -1px;
  margin-left: 13.5%;
  margin-top: 1%;
  border-radius: 0 0 10px 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  max-height: 300px;
  overflow-y: auto;
  z-index: 99;
`;

const AutoCompleteItem = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f2f2f2;
  }
`;

function SearchInput() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [autoCompleteValue, setAutoCompleteValue] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  // const searchInputRef = useRef(null);
  const [showAutoComplete, setShowAutoComplete] = useState(false);
  const autoCompleteContainerRef = useRef(null);

  // 유효한 문자열 검사 (한글, 영문, 숫자)
  const isSyllable = (character) => {
    const syllableRegex = /^[가-힣a-zA-Z0-9]$/;

    return syllableRegex.test(character);
  };

  // 입력값 변경 핸들러
  const handleInputChange = (event) => {
    const newInputValue = event.target.value.trim();
    setShowAutoComplete(true);
    setKeyword(newInputValue);
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
  const fetchAutoCompleteData = (name) => {
    axios
      .get(`${BASE_URL}/api/company/auto-complete?name=${name}`)
      .then((response) => {
        setAutoCompleteValue(response.data.data);
      })
      .catch((error) => {
        console.error('자동완성 데이터 요청 실패', error);
        setAutoCompleteValue([]);
      });
  };

  // 검색 함수
  const handleSearch = () => {
    try {
      // 사용자가 방향키로 특정 자동완성 항목을 선택하지 않고,
      // 자동완성 목록이 있을 경우엔 전체 데이터를 결과 페이지로 전달합니다.
      if (activeIndex === -1) {
        const params = new URLSearchParams();
        params.append('keyword', keyword);
        navigate(`/search-result?${params.toString()}`);
      }
      // 사용자가 방향키로 특정 자동완성 항목을 선택한 경우에 특정 항목만 결과 페이지로 전달합니다.
      else if (activeIndex >= 0 && autoCompleteValue[activeIndex]) {
        const params = new URLSearchParams();
        params.append('keyword', autoCompleteValue[activeIndex].name);
        navigate(`/search-result?${params.toString()}`);
      }
    } catch (error) {
      console.error('검색 중 오류 발생', error);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        autoCompleteContainerRef.current &&
        !autoCompleteContainerRef.current.contains(e.target)
      ) {
        setShowAutoComplete(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  // 자동완성 선택 함수
  const selectAutoCompleteValue = (value) => {
    setKeyword(value);
    setAutoCompleteValue([]);
    handleSearch();
  };

  return (
    <>
      <StyledSearchInput
        type="text"
        className="search-input-text"
        placeholder="기업 명을 검색하세요"
        value={keyword}
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

      {showAutoComplete && autoCompleteValue.length > 0 && (
        <AutoCompleteContainer ref={autoCompleteContainerRef}>
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
    </>
  );
}

export default SearchInput;
