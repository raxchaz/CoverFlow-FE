import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../asset/sass/pages/searchPage/companyRegistPage.scss';
import { StyledPage, StyledHeader } from '../../../styledComponent.js';
import TitleHeader from '../../ui/header/titleHeader';
import TabBar from '../../ui/tabBar/tabBar';
import { city, type } from '../../global/constants/companyOption.ts';
import { showErrorToast, showSuccessToast } from '../../ui/toast/toast.tsx';
import { fetchAPINoToken } from '../../global/utils/apiUtil.js';

interface CompanyInfoProps {
  name: string;
  type: string;
  city: string;
  district: string;
  establishment: string;
}

function CompanyRegistPage() {
  const navigate = useNavigate();

  const [companyInfo, setCompanyInfo] = useState({
    name: '',
    type: '',
    city: '',
    district: '',
    establishment: '',
  });

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

  const checkRequiredFields = (info: CompanyInfoProps) => {
    const { name, city, type, district } = info;
    if (name === '' && city === '' && type === '' && district === '') {
      showErrorToast('필수 필드를 모두 입력해주세요.');
    }
  };

  const isRequired = (
    name: string,
    city: string,
    type: string,
    district?: string,
  ): boolean => {
    return Boolean(name) && Boolean(city) && Boolean(type) && Boolean(district);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    checkRequiredFields(companyInfo);

    try {
      await fetchAPINoToken(`/api/company`, 'POST', companyInfo);
      showSuccessToast('기업 등록이 완료되었어요!');
      navigate('/search-company');
    } catch (error) {
      showErrorToast(`기업 등록에 실패했어요. ${error}`);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <StyledPage className="main-page-container">
      <StyledHeader>
        <TitleHeader pageTitle="기업 등록" handleGoBack={handleGoBack} />
        <form onSubmit={handleSubmit} className="company-form" style={{marginTop:'10rem'}}>
          <div className="regist-company-name">
            <span>기업명</span> <div className="neccessary"> * 필수</div>
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
            <span>업종</span> <div className="neccessary"> * 필수</div>
          </div>
          <select
            id="type"
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
              <span>지역</span> <div className="neccessary"> * 필수</div>
            </div>
            <select
              id="city"
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
              placeholder="시/군/구"
              name="district"
              value={companyInfo.district}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className={`submit-regist ${isRequired(companyInfo.name, companyInfo.city, companyInfo.type, companyInfo.district) ? 'selected' : ''}`}
            disabled={
              companyInfo.name === '' ||
              companyInfo.city === '' ||
              companyInfo.type === ''
            }
          >
            <span>등록하기</span>
          </button>
        </form>
      </StyledHeader>
      <TabBar />
    </StyledPage>
  );
}

export default CompanyRegistPage;
