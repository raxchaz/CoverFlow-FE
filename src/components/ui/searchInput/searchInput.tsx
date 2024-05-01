import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../../asset/sass/etc/searchInput/searchInput.scss';
import styled from 'styled-components';
import Searchicon from '../../../asset/image/searchicon.svg';

import { BASE_URL } from '../../global/constants';
import useDebounce from '../../../hooks/useDebounce';
import { conditionalExecution } from '../../../utils/utils';
import { showErrorToast } from '../toast/toast';

const StyledSearchInput = styled.input`
  width: 51.5rem;
  height: 5.5rem;
  padding: 0.8rem 0.8rem 0.8rem 2rem;
  border: 2px solid #ffbd7c;
  background-color: #fff;
  border-radius: 3rem;
  margin: 9% 0% 0% 12.5%;
  outline: none;

  &:focus {
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
    border-color: #ff8d1d;
    box-shadow: 0 0 2px rgba(106, 57, 9, 0.5);
  }

  &::placeholder {
    color: #cacaca;
    font-size: 1.4rem;
    letter-spacing: -1.5px;
  }
`;

const AutoCompleteContainer = styled.div`
  position: absolute;
  background-color: #fefefe;
  width: 515px;
  letter-spacing: -1px;
  margin-left: 14%;
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
  &.active {
    background-color: #f2f2f2;
  }
`;

interface CompanyProps {
  name: string;
  companyName: string;
}

interface SearchInputProps {
  setCurrentPage?: (page: number) => void;
}

function SearchInput({ setCurrentPage }: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [autoCompleteValue, setAutoCompleteValue] = useState<CompanyProps[]>(
    [],
  );
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showAutoComplete, setShowAutoComplete] = useState(false);
  const autoCompleteContainerRef = useRef<HTMLDivElement | null>(null);
  const [totalCompany, setTotalCompany] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const debouncedKeyword = useDebounce(keyword, 300);

  // 유효한 문자열 검사 (한글, 영문, 숫자)
  // const isSyllable = (character) => {
  //   const syllableRegex = /^[가-힣a-zA-Z0-9]$/;

  //   return syllableRegex.test(character);
  // };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (activeIndex >= 0 && autoCompleteValue[activeIndex]) {
      const selectedItem = autoCompleteContainerRef.current?.children[
        activeIndex
      ] as HTMLElement;

      selectedItem?.focus();
    }
  }, [activeIndex, autoCompleteValue]);

  useEffect(() => {
    if (debouncedKeyword !== '') {
      fetchAutoCompleteData(debouncedKeyword);
    } else {
      setAutoCompleteValue([]);
    }
  }, [debouncedKeyword]);

  useEffect(() => {
    if (!showAutoComplete && keyword) {
      handleCompanySearch();
    }
  }, [showAutoComplete, keyword]);

  // 입력값 변경 핸들러
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newInputValue = event.target.value.trim();
    setShowAutoComplete(true);
    setKeyword(newInputValue);
    setActiveIndex(-1);
  };

  // 자동완성 데이터 요청
  const fetchAutoCompleteData = async (name: string) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/company?pageNo=0&name=${name}`,
      );
      setAutoCompleteValue(res.data.data.companyList);
      setTotalCompany(res.data.data.totalElements);
      setTotalPages(res.data.data.totalPages);
      // console.log('인풋 내 결과', res.data);
    } catch (error) {
      showErrorToast(`자동완성 데이터 요청 실패 ${error}`);
      setAutoCompleteValue([]);
    }
  };

  // 검색 함수
  const handleCompanySearch = () => {
    if (!keyword) return;

    const params = new URLSearchParams();
    params.append('keyword', keyword);
    setCurrentPage?.(0);
    navigate(`/search-result?${params.toString()}`, {
      state: { searchResults: autoCompleteValue, totalCompany, totalPages },
    });
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        autoCompleteContainerRef.current &&
        !autoCompleteContainerRef.current.contains(e.target as Node)
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
  const selectAutoCompleteValue = (companyName: string) => {
    const selectedItem = autoCompleteValue.find(
      (item) => item.companyName === companyName,
    );

    if (selectedItem) {
      // console.log('선택된 회사:', selectedItem.companyName);
      setKeyword(selectedItem.companyName);
      setShowAutoComplete(false);

      setTimeout(() => {
        const params = new URLSearchParams();
        params.append('keyword', selectedItem.companyName);
        navigate(`/search-result?${params.toString()}`, {
          state: { searchResults: [selectedItem], totalCompany, totalPages },
        });
      }, 0);
    } else {
      showErrorToast('선택한 회사를 찾을 수 없습니다.');
    }
  };

  const enteredKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const condition = [
      {
        test: () =>
          event.key === 'ArrowDown' &&
          activeIndex < autoCompleteValue.length - 1,
        execute: () => {
          setActiveIndex(activeIndex + 1);
        },
      },
      {
        test: () => event.key === 'ArrowUp' && activeIndex > 0,
        execute: () => {
          setActiveIndex(activeIndex - 1);
        },
      },
      {
        test: () => event.key === 'Enter',
        execute: () => {
          activeIndex >= 0 && autoCompleteValue[activeIndex]
            ? selectAutoCompleteValue(
                autoCompleteValue.map((value) => value.companyName)[
                  activeIndex
                ],
              )
            : handleCompanySearch();
        },
      },
    ];

    conditionalExecution(condition);
  };

  return (
    <>
      <StyledSearchInput
        ref={inputRef}
        type="text"
        className="search-input-text"
        placeholder="기업 명을 검색하세요"
        value={keyword || ''}
        onChange={handleInputChange}
        onKeyDown={enteredKey}
      />
      <img
        className="search"
        src={Searchicon}
        onClick={handleCompanySearch}
        alt="Search"
      />

      {showAutoComplete && autoCompleteValue.length > 0 && (
        <AutoCompleteContainer ref={autoCompleteContainerRef}>
          {autoCompleteValue.map((value, index) => (
            <AutoCompleteItem
              key={index}
              onClick={() => selectAutoCompleteValue(value.companyName)}
              style={
                index === activeIndex ? { backgroundColor: '#f2f2f2' } : {}
              }
              className={index === activeIndex ? 'active' : ''}
            >
              {value.companyName}
            </AutoCompleteItem>
          ))}
        </AutoCompleteContainer>
      )}
    </>
  );
}

export default SearchInput;
