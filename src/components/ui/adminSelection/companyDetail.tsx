import React, { useState, useEffect } from 'react';
import './companySelection.scss';
import {
  city,
  statusOptions,
  district,
  type,
} from '../../global/constants/companyOption';
import Button from '../button/Button/Button';
import { fetchAPI } from '../../global/utils/apiUtil';
interface Company {
  companyId: number;
  companyName: string;
  companyType: string;
  companyCity: string;
  companyDistrict: string;
  questionCount: number;
  companyStatus: string;
}
interface CompanyDetailProps {
  company: Company;
  showCompanyList: () => void;
  handleSearch: () => void;
}

export default function CompanyDetail({
  company,
  showCompanyList,
  handleSearch,
}: CompanyDetailProps) {
  const [editedCompany, setEditedCompany] = useState(company);
  const [districtOptions, setDistrictOptions] = useState<string[]>([]);
  useEffect(() => {
    const districts = district[editedCompany.companyCity] || [];
    setDistrictOptions(districts);
  }, [editedCompany.companyCity]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedCompany((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateCompany = async () => {
    try {
      const {
        companyId,
        companyName,
        companyType,
        companyCity,
        companyDistrict,

        companyStatus,
      } = editedCompany;

      await fetchAPI(`/api/company/admin/${companyId}`, 'PATCH', {
        name: companyName,
        type: companyType,
        city: companyCity,
        district: companyDistrict,

        companyStatus,
      });
      handleSearch();
      showCompanyList();
    } catch (error) {
      console.error('기업 정보 수정 실패:', error);
    }
  };

  return (
    <div>
      <div className="ad-searchOption-detail">
        <div className="ad-searchOption-item">
          <p className="ad-searchOption-title">기업명</p>
          <input
            className="ad-searchOption-select"
            name="companyName"
            defaultValue={editedCompany.companyName}
            onChange={handleChange}
          />
        </div>
        <div className="ad-searchOption-item">
          <p className="ad-searchOption-title">기업 업종</p>
          <select
            name="companyType"
            className="ad-searchOption-select"
            value={editedCompany.companyType}
            onChange={handleChange}
          >
            <option value=""></option>
            {type.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="ad-searchOption-item">
          <p className="ad-searchOption-title">도시</p>
          <select
            name="companyCity"
            className="ad-searchOption-select"
            value={editedCompany.companyCity}
            onChange={handleChange}
          >
            <option value=""></option>
            {city.map((cityName, index) => (
              <option key={index} value={cityName}>
                {cityName}
              </option>
            ))}
          </select>
        </div>
        <div className="ad-searchOption-item">
          <p className="ad-searchOption-title">시/군/구</p>
          <select
            name="companyDistrict"
            className="ad-searchOption-select"
            value={editedCompany.companyDistrict}
            onChange={handleChange}
          >
            <option value="">시/군/구 선택</option>
            {districtOptions.map((districtName, index) => (
              <option key={index} value={districtName}>
                {districtName}
              </option>
            ))}
          </select>
        </div>
        <div className="ad-searchOption-item">
          <p className="ad-searchOption-title">검토상태</p>
          <select
            name="companyStatus"
            className="ad-searchOption-select"
            value={editedCompany.companyStatus}
            onChange={handleChange}
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
      <div className="admin-btn-wrapper">
        <Button variant="admin" onClick={handleUpdateCompany}>
          수정 완료
        </Button>
        <Button variant="admin-white" onClick={showCompanyList}>
          취소하기
        </Button>
      </div>
    </div>
  );
}
