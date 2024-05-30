import React, { useState, useEffect } from 'react';
import './companySelection.scss';
import AdminSearch from '../../../asset/image/admin-search.svg';
import AdminPagination from './adminPagination';
import {
  city,
  district,
  statusOptions,
  type,
} from '../../global/constants/companyOption';
import { ACCESS_TOKEN, BASE_URL } from '../../global/constants';
import CompanyDetail from './companyDetail';
import Button from '../button/Button/Button';

interface Company {
  companyId: number;
  companyName: string;
  companyType: string;
  companyCity: string;
  companyDistrict: string;
  companyEstablishment: string;
  questionCount: number;
  companyStatus: string;
}

interface ApiResponse {
  statusCode: string;
  data: {
    totalPages: number;
    companies: Company[];
    totalElements: number;
  };
}

export default function CompanySelection() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [totalCompanyCount, seTtotalCompanyCount] = useState(0);
  const [selectedCompany, setSelectedCompany] = useState(null);
  console.log(selectedCompany);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [companyType, setcompanyType] = useState('');
  const [companyStatus, setCompanyStatus] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrictOptions, setSelectedDistrictOptions] = useState<
    string[]
  >([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const itemsPerPage = 10;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchCompanies(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (selectedCity) {
      setSelectedDistrictOptions(district[selectedCity]);
    } else {
      setSelectedDistrictOptions([]);
    }
  }, [selectedCity]);

  const handlePagination = (direction) => {
    if (direction === 'prev' && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else if (direction === 'next' && currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else if (typeof direction === 'number') {
      setCurrentPage(direction);
    }
  };

  const fetchCompanies = (pageNo: number) => {
    setIsLoading(true);
    const queryParams = new URLSearchParams({
      pageNo: pageNo.toString(),
      criterion: 'createdAt',
    });

    if (companyType) {
      queryParams.set('type', companyType);
    }
    if (companyStatus) {
      queryParams.set('companyStatus', companyStatus);
    }
    if (selectedCity) {
      queryParams.set('city', selectedCity);
    }
    if (selectedDistrict) {
      queryParams.set('district', selectedDistrict);
    }

    const item = `${BASE_URL}/api/company/admin/count?${queryParams.toString()}`;
    fetch(item, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data: ApiResponse) => {
        console.log(data);
        setCompanies(data.data.companies);
        setTotalPages(data.data.totalPages);
        seTtotalCompanyCount(data.data.totalElements);
      })
      .catch((error) => {
        console.error('Error:', error);
        setIsLoading(false);
      });

    const url = `${BASE_URL}/api/company/admin?${queryParams.toString()}`;
    fetch(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data: ApiResponse) => {
        // console.log(data);
        setCompanies(data.data.companies);
        setIsLoading(false);
      })
      .catch((error) => {
        // console.error('Error:', error);
        console.error('Error:', error);
        setIsLoading(false);
      });
  };

  const handleSearch = () => {
    setCurrentPage(0);
    fetchCompanies(0);
  };

  const showCompanyDetail = (company) => {
    setSelectedCompany(company);
  };

  const showCompanyList = () => {
    setSelectedCompany(null);
  };

  return (
    <div className="ad-companySelection-container">
      <div className="ad-search">
        <div className="search-container">
          <div className="search-row">
            <select className="search-divider" name="searchOpt" id="searchOpt">
              <option value=""></option>
              <option value="옵션1">옵션1</option>
              <option value="옵션2">옵션2</option>
            </select>
            <input
              className="search-prompt"
              placeholder="검색어를 입력해주세요"
            />
          </div>
          <img className="search-icon" src={AdminSearch} alt="Search" />
        </div>
      </div>
      {selectedCompany ? (
        <>
          <h1 className="ad-company-title">기업 등록 관리</h1>
          <CompanyDetail
            company={selectedCompany}
            showCompanyList={showCompanyList}
            handleSearch={handleSearch}
          />
        </>
      ) : (
        <>
          <div className="ad-searchOption">
            <div className="ad-searchOption-item">
              <span className="ad-searchOption-title">기업 업종</span>
              <select
                className="ad-searchOption-select"
                value={companyType}
                onChange={(e) => setcompanyType(e.target.value)}
              >
                <option value=""></option>
                {type.map((companyType, index) => (
                  <option key={index} value={companyType}>
                    {companyType}
                  </option>
                ))}
              </select>
            </div>
            <div className="ad-searchOption-item">
              <span className="ad-searchOption-title">도시</span>
              <select
                className="ad-searchOption-select"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value=""></option>
                {city.map((cityName) => (
                  <option key={cityName} value={cityName}>
                    {cityName}
                  </option>
                ))}
              </select>
            </div>
            <div className="ad-searchOption-item">
              <span className="ad-searchOption-title">시/군/구</span>
              <select
                className="ad-searchOption-select"
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
              >
                <option value=""></option>
                {selectedDistrictOptions.map((districtName, index) => (
                  <option key={index} value={districtName}>
                    {districtName}
                  </option>
                ))}
              </select>
            </div>{' '}
            <div className="ad-searchOption-item">
              <span className="ad-searchOption-title">검토 상태</span>
              <select
                className="ad-searchOption-select"
                value={companyStatus}
                onChange={(e) => setCompanyStatus(e.target.value)}
              >
                <option value=""></option>
                {statusOptions.map((option) => (
                  <option key={option.key} value={option.key}>
                    {option.value}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="ad-searchResult">
            <div className="admin-btn-wrapper">
              <Button variant="admin" onClick={handleSearch}>
                검색
              </Button>
              <Button
                variant="admin-white"
                onClick={() => {
                  setcompanyType('');
                  setCompanyStatus('');
                  setSelectedDistrict('');
                  setSelectedCity('');
                  setCurrentPage(0);
                }}
              >
                초기화
              </Button>
            </div>

            {isLoading ? (
              <p>로딩 중...</p>
            ) : (
              <div>
                <p className="ad-cnt">
                  <span className="ad-cnt-num">{totalCompanyCount}</span>건의
                  기업이 검색되었습니다.
                </p>

                <div className="ad-result">
                  <ul>
                    <li className="ad-searchResult-header">
                      <input type="checkbox" />
                      <span>번호</span>
                      <span>기업명</span>
                      <span>업종</span>
                      <span>도시</span>
                      <span>시군구</span>
                      <span>관리</span>
                    </li>
                    {companies.map((company, index) => {
                      const itemNumber = index + 1 + currentPage * itemsPerPage;
                      return (
                        <li
                          key={company.companyId}
                          className="ad-searchResult-item"
                        >
                          <input type="checkbox" />
                          <span>{itemNumber}</span>
                          <span>{company.companyName}</span>
                          <span>{company.companyType}</span>
                          <span>{company.companyCity}</span>
                          <span>{company.companyDistrict}</span>
                          <span onClick={() => showCompanyDetail(company)}>
                            <span className="ad-detail">관리 변경</span>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="ad-member-pagination">
                  {companies && (
                    <AdminPagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      handlePagination={handlePagination}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
