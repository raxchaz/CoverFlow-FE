import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../../asset/sass/pages/searchPage/companyRegistPage.scss';
import { ACCESS_TOKEN, BASE_URL } from '../../global/constants/index.js';
import { StyledPage, StyledHeader } from '../../../styledComponent.js';
import TitleHeader from '../../ui/header/titleHeader.jsx';
import TabBar from '../../ui/tabBar/tabBar.jsx';

function CompanyRegistPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    if (!token) {
      localStorage.setItem('companyRegistURL', '/company-regist');
      navigate('/login');
    }
  }, [navigate]);

  // 회사 정보 상태 관리
  const [companyInfo, setCompanyInfo] = useState({
    companyName: '',
    industry: '',
    stateOrProvince: '',
    cityOrDistrict: '',
  });

  // '직접 입력' 선택 시 사용하는 상태
  const [otherIndustry, setOtherIndustry] = useState('');

  // 업종 및 지역 선택 옵션
  const industries = ['정보기술', '제조', '금융', '직접 입력'];
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

  // 입력 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'industry' && value !== '직접 입력') {
      setOtherIndustry(''); // 업종이 '직접 입력'이 아닐 경우 otherIndustry 초기화
    }
    setCompanyInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  // '직접 입력' 업종 변경 핸들러
  const handleOtherInputChange = (e) => {
    setOtherIndustry(e.target.value);
    setCompanyInfo((prevInfo) => ({
      ...prevInfo,
      industry: e.target.value, // 직접 입력한 업종으로 업데이트
    }));
  };

  // 로그인 상태 검사
  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      localStorage.setItem('companyRegistPageURL', '/company-regist');
      navigate('/login');
    }
  }, [navigate]);

  // 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Company Information:', companyInfo);

    axios
      .post(`${BASE_URL}/api/company/admin/save-company`, companyInfo, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      })
      .then((response) => {
        console.log('Server Response:', response.data);
        navigate('/');
      })
      .catch((error) => {
        console.error('기업 등록에 실패했어요', error);
      });
  };

  // 뒤로 가기 핸들러
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <StyledPage className="main-page-container">
      <StyledHeader>
        <TitleHeader pageTitle="기업 등록" handleGoBack={handleGoBack} />
        <form onSubmit={handleSubmit} className="company-form">
          {/* 기업명 입력 */}
          <div className="regist-company-name">
            기업명 <div className="neccessary"> * 필수</div>
          </div>
          <input
            type="text"
            className="input-field-regist"
            placeholder="기업 이름을 정확히 작성해주세요"
            name="companyName"
            value={companyInfo.companyName}
            onChange={handleChange}
          />
          {/* 업종 선택 */}
          <div className="regist-company-industry">
            업종 <div className="neccessary"> * 필수</div>
          </div>
          <select
            className="option-field"
            name="industry"
            value={companyInfo.industry}
            onChange={handleChange}
          >
            <option value="">업종을 선택해주세요</option>
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
          {companyInfo.industry === '직접 입력' && (
            <input
              type="text"
              className="input-field-regist"
              placeholder="업종 직접 입력"
              name="otherIndustry"
              value={otherIndustry}
              onChange={handleOtherInputChange}
            />
          )}
          {/* 지역 선택 */}
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
              placeholder="시/군/구"
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
