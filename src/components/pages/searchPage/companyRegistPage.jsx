import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../../asset/sass/pages/searchPage/companyRegistPage.scss';
import { ACCESS_TOKEN, BASE_URL } from '../../global/constants/index.js';
import { StyledPage, StyledHeader } from '../../../styledComponent.js';
import TitleHeader from '../../ui/header/titleHeader.jsx';
import TabBar from '../../ui/tabBar/tabBar.jsx';

function CompanyRegistPage() {
  const navigate = useNavigate();

  const [companyInfo, setCompanyInfo] = useState({
    companyName: '',
    industry: '',
    stateOrProvince: '',
    cityOrDistrict: '',
  });

  const industries = [
    '서비스업',
    '제조／화학',
    '의료／제약／복지',
    '유통／무역／운송',
    '교육업',
    '건설업',
    'IT / 웹 / 통신',
    '미디어 / 디자인',
    '은행 / 금융업',
    '기관 / 협회',
    '미디어 및 엔터테인먼트',
  ];
  const provinces = [
    '서울특별시',
    '부산광역시',
    '대구광역시',
    '인천광역시',
    '광주광역시',
    '대전광역시',
    '울산광역시',
    '세종특별자치시',
    '경기도',
    '강원도',
    '충청북도',
    '충청남도',
    '전라북도',
    '전라남도',
    '경상북도',
    '경상남도',
    '제주특별자치도',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('기업 정보 제출 중:', companyInfo);

    axios
      .post(`${BASE_URL}/api/company/admin/save-company`, companyInfo, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      })
      .then((response) => {
        console.log('서버 응답:', response.data);
        navigate('/');
      })
      .catch((error) => {
        console.error('기업 등록에 실패했어요', error);
      });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <StyledPage className="main-page-container">
      <StyledHeader>
        <TitleHeader pageTitle="기업 등록" handleGoBack={handleGoBack} />
        <form onSubmit={handleSubmit} className="company-form">
          <div className="regist-company-name">
            기업명 <div className="neccessary"> * 필수</div>
          </div>
          <input
            type="text"
            className="input-field-regist"
            placeholder="기업 이름을 정확히 작성해 주세요"
            name="companyName"
            value={companyInfo.companyName}
            onChange={handleChange}
          />
          <div className="regist-company-industry">
            업종 <div className="neccessary"> * 필수</div>
          </div>
          <select
            className="option-field"
            name="industry"
            value={companyInfo.industry}
            onChange={handleChange}
          >
            <option value="">업종을 선택해 주세요</option>
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
          <div className="location-container">
            <div className="regist-company-province">
              지역 <div className="neccessary"> * 필수</div>
            </div>
            <select
              className="option-field"
              name="stateOrProvince"
              value={companyInfo.stateOrProvince}
              onChange={handleChange}
            >
              <option value="">도 / 특별시 / 광역시</option>
              {provinces.map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
            <input
              type="text"
              className="input-field-regist"
              placeholder="시 /군 /구 (선택)"
              name="cityOrDistrict"
              value={companyInfo.cityOrDistrict}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="submit-regist">
            등록하기
          </button>
        </form>
      </StyledHeader>
      <TabBar />
    </StyledPage>
  );
}

export default CompanyRegistPage;
