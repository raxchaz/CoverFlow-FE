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
    totalCompanyCount: number;
  };
}

export default function CompanySelection() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [totalCompanyCount, seTtotalCompanyCount] = useState<number>(0);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [companyStatus, setCompanyStatus] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedDistrictOptions, setSelectedDistrictOptions] = useState<
    string[]
  >([]);

  useEffect(() => {
    fetchCompanies(currentPage, companyStatus);
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

  const fetchCompanies = (pageNo: number, status: string) => {
    fetch(
      `${BASE_URL}/api/company/admin/status?pageNo=${pageNo}&Wcriterion=createdAt&companyStatus=${status}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
          'Content-Type': 'application/json',
        },
      },
    )
      .then((response) => response.json())
      .then((data: ApiResponse) => {
        console.log(data);
        setCompanies(data.data.companies);
        setTotalPages(data.data.totalPages);
        seTtotalCompanyCount(data.data.totalCompanyCount);
      })
      .catch((error) => console.error('Error:', error));
  };

  const handleSearch = () => {
    setCurrentPage(0);
    fetchCompanies(0, companyStatus);
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
              <select className="ad-searchOption-select">
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
                <option value="">도시 선택</option>
                {city.map((cityName) => (
                  <option key={cityName} value={cityName}>
                    {cityName}
                  </option>
                ))}
              </select>
            </div>
            <div className="ad-searchOption-item">
              <span className="ad-searchOption-title">시/군/구</span>
              <select className="ad-searchOption-select">
                <option value="">시/군/구 선택</option>
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
                  setCompanyStatus('');
                  setCurrentPage(0);
                }}
              >
                초기화
              </Button>
            </div>

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
                  {companies.map((company, index) => (
                    <li
                      key={company.companyId}
                      className="ad-searchResult-item"
                    >
                      <input type="checkbox" />
                      <span>{index + 1}</span>
                      <span>{company.companyName}</span>
                      <span>{company.companyType}</span>
                      <span>{company.companyCity}</span>
                      <span>{company.companyDistrict}</span>
                      <span onClick={() => showCompanyDetail(company)}>
                        <span className="ad-detail">관리 변경</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              {companies && (
                <AdminPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  handlePagination={handlePagination}
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
