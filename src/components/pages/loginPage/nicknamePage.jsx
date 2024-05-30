import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import AgeSelection from '../../ui/ageSelection/ageSelection';
import GenderSelection from '../../ui/genderSelection/genderSelection';
import '../../../asset/sass/pages/loginPage/nicknamePage.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { StyledHeader, StyledPage } from '../../../styledComponent';
import TitleHeader from '../../ui/header/titleHeader.tsx';
import { fetchAPI } from '../../global/utils/apiUtil.js';
import { showErrorToast, showSuccessToast } from '../../ui/toast/toast.tsx';

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;

  border-bottom: 1px solid #d9d9d9;
  width: calc(80% - 25px);
  padding: 2%;
  margin-left: 10%;
`;
const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 2rem;
  font-family: Pretendard-SemiBold;
  cursor: pointer;
  letter-spacing: -1px;

  color: #000;
`;
const Icon = styled(FontAwesomeIcon)`
  margin-right: 2rem;
  width: 34px;
  height: 34px;
  color: ${(props) => (props.checked ? '#22932D' : '#d9d9d9')};
`;
const HiddenCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
`;

const StartButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'isActive',
})`
  width: 520px;
  height: 45px;
  background-color: #ff8d1d;
  color: white;
  border: none;
  padding: 8px 15px;
  font-size: 2rem;
  font-family: Pretendard-Bold;
  letter-spacing: -1px;
  font-weight: 800;
  cursor: ${(props) => (props.isActive ? 'pointer' : 'not-allowed')};
  margin: 3% 0 5% 10%;
  border-radius: 0px;

  &:hover {
    background-color: ${(props) => (props.isActive ? '#ff8d1d' : '#ccc')};
    font-weight: ${(props) => (props.isActive ? 'bold' : 'normal')};
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;

    &:hover {
      background-color: #ccc;
      font-weight: 800;
    }
  }
`;

const NicknamePage = () => {
  const [selectedAgeKeyword, setSelectedAgeKeyword] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [isJobSeeking, setIsJobSeeking] = useState(false);
  const [isEmployed, setIsEmployed] = useState(false);
  const navigate = useNavigate();

  /*
    사용자가 입력해야 할 데이터들을 정의해 놓았습니다.
  */
  const handleJobSeekingChange = () => {
    setIsJobSeeking(!isJobSeeking);
    setIsEmployed(false);
  };

  const handleEmployedChange = () => {
    setIsEmployed(!isEmployed);
    setIsJobSeeking(false);
  };

  const handleSelectAge = (ageKeyword) => {
    setSelectedAgeKeyword(ageKeyword);
  };

  const handleSelectGender = (gender) => {
    setSelectedGender(gender);
  };

  /*
  해당 페이지에 진입하자마자 사용자의 로그인 상태를 확인합니다.
  토큰을 가지고 있는 사용자라면, 잘못된 접근임을 명시하고, 다시 로그인 페이지로 리다이렉트 합니다.
  */
  useEffect(() => {
    // const checkLoginStatus = () => {
    //   const token = localStorage.getItem(ACCESS_TOKEN);
    //   if (!token) {
    //     alert('잘못된 접근입니다. 로그인이 필요합니다.');
    //     navigate('/login');
    //   }
    // };
    // checkLoginStatus();
  }, [navigate]);

  /*
사용자가  데이터를 선택하고, 시작하기 버튼을 눌렀을 때,
데이터가 서버로 전송될 수 있도록 하는 로직입니다.
 */
  const sendDataToServer = async () => {
    try {
      let genderData = '';

      if (selectedGender === '여성') {
        genderData = 'Female';
      } else if (selectedGender === '남성') {
        genderData = 'Male';
      } else {
        genderData = 'Unknown';
      }

      const ageRange =
        {
          '10대': '10-19',
          '20대': '20-29',
          '30대': '30-39',
          '40대': '40-49',
          '50대': '50-59',
          '60대 이상': '60-',
        }[selectedAgeKeyword] || selectedAgeKeyword;

      let tagData = '';

      if (isJobSeeking) {
        tagData = '취준생';
      } else if (isEmployed) {
        tagData = '현직자';
      }

      const body = {
        tag: tagData,
        age: ageRange,
        gender: genderData,
      };
      await fetchAPI('/api/member', 'POST', body);
      navigate('/');
      showSuccessToast('환영합니다!');
    } catch (error) {
      console.error(error);
      showErrorToast('데이터 전송에 실패했습니다.');
    }
  };

  /* ====================================================  */
  return (
    <>
      <StyledPage className="main-page-container">
        <StyledHeader>
          <TitleHeader pageTitle="회원 정보 설정" />
          <div className="nickname-info-con">
            <span className="welcome-nickname">
              현재 본인의 상황을 <br /> 체크해 주세요
            </span>
            <div className="neccessary"> * 필수</div>
          </div>

          <CheckboxContainer>
            <HiddenCheckbox
              type="checkbox"
              id="jobSeekingCheckbox"
              checked={isJobSeeking}
              onChange={handleJobSeekingChange}
            />
            <CheckboxLabel htmlFor="jobSeekingCheckbox" checked={isJobSeeking}>
              <Icon icon={faCircleCheck} checked={isJobSeeking} />
              취업 준비 중이에요
            </CheckboxLabel>
          </CheckboxContainer>

          <CheckboxContainer>
            <HiddenCheckbox
              type="checkbox"
              id="employedCheckbox"
              checked={isEmployed}
              onChange={handleEmployedChange}
            />
            <CheckboxLabel htmlFor="employedCheckbox" checked={isEmployed}>
              <Icon icon={faCircleCheck} checked={isEmployed} />
              현재 직장을 다니고 있어요
            </CheckboxLabel>
          </CheckboxContainer>

          <div className="nickname-info">
            <span className="welcome-nickname">
              연령대 및 성별을 <br /> 체크해 주세요
            </span>
            <div className="select"> * 선택</div>
            <AgeSelection
              selectedAgeKeyword={selectedAgeKeyword}
              onSelectAge={handleSelectAge}
            />
            <div className="separator"></div>
            <GenderSelection
              selectedGender={selectedGender}
              onSelectGender={handleSelectGender}
            />
          </div>
          <StartButton
            onClick={sendDataToServer}
            isActive={isEmployed || isJobSeeking}
            disabled={!isEmployed && !isJobSeeking}
            style={{
              backgroundColor: isEmployed || isJobSeeking ? '#ff8d1d' : '',
            }}
          >
            시작하기
          </StartButton>
        </StyledHeader>
      </StyledPage>
    </>
  );
};

export default NicknamePage;
