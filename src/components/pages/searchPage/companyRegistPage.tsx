import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../../asset/sass/pages/searchPage/companyRegistPage.scss';
import { BASE_URL } from '../../global/constants/index.js';
import { StyledPage, StyledHeader } from '../../../styledComponent.js';
import TitleHeader from '../../ui/header/titleHeader';
import TabBar from '../../ui/tabBar/tabBar.js';
import { toast } from 'react-toastify';

interface CompanyInfoProps {
  name: string;
  type: string;
  city: string;
  district: string;
  establishment: string;
}

function CompanyRegistPage() {
  const navigate = useNavigate();

  const [companyInfo, setCompanyInfo] = useState<CompanyInfoProps>({
    name: '',
    type: '',
    city: '',
    district: '',
    establishment: '',
  });

  const type = [
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
  const city = [
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

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    // if (name === 'name') {
    //   if (/^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{1}$/.test(value)) {
    //     alert('기업 이름에는 한글, 영문, 숫자로만 이루어져야 합니다.');
    //     return;
    //   }
    // }

    setCompanyInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const isRequiredField = (info: CompanyInfoProps) => {
    if (info.name === '' || info.city === '' || info.type === '') {
      toast.error('필수 필드를 모두 입력해주세요.');
      return;
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log('기업 정보 제출 중:', companyInfo);

    isRequiredField(companyInfo);

    axios
      .post(`${BASE_URL}/api/company`, companyInfo, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log('서버 응답:', response.data);
        navigate('/search-company');
        toast.success('기업 등록이 완료되었어요!');
      })
      .catch(() => {
        toast.error('기업 등록에 실패했어요');
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
            name="name"
            value={companyInfo.name}
            onChange={handleChange}
          />
          <div className="regist-company-industry">
            업종 <div className="neccessary"> * 필수</div>
          </div>
          <select
            className="option-field"
            name="type"
            value={companyInfo.type}
            onChange={handleChange}
          >
            <option value="">업종을 선택해 주세요</option>
            {type.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <div className="location-container">
            <div className="regist-company-province">
              지역 <div className="neccessary"> * 필수</div>
            </div>
            <select
              className="option-field"
              name="city"
              value={companyInfo.city}
              onChange={handleChange}
            >
              <option value="">도 / 특별시 / 광역시</option>
              {city.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <input
              type="text"
              className="input-field-regist"
              placeholder="시 /군 /구 (선택)"
              name="district"
              value={companyInfo.district}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="submit-regist"
            disabled={
              companyInfo.name === '' ||
              companyInfo.city === '' ||
              companyInfo.type === ''
            }
          >
            등록하기
          </button>
        </form>
      </StyledHeader>
      <TabBar />
    </StyledPage>
  );
}

export default CompanyRegistPage;
