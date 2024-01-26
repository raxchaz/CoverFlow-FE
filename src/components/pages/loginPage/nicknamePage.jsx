import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import AgeSelection from '../../ui/ageSelection/ageSelection';
import GenderSelection from '../../ui/genderSelection/genderSelection';
import '../../../asset/sass/pages/loginPage/nicknamePage.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

const StyledNicknamePage = styled.div`
  position: relative;
  height: 100vh;
  background-color: #ffffff;
  overflow-y: auto;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 9% 0% -6.5% 10%;
  border-bottom: 2px solid #d9d9d9;
  width: calc(80% - 25px);
  padding: 2%;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  margin-left: 1%;
  font-size: 1rem;
  cursor: pointer;
  letter-spacing: -1px;

  color: #000;
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 7px;
  width: 20px;
  height: 20px;
  color: ${(props) => (props.checked ? '#22932D' : '#d9d9d9')};
`;

const HiddenCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
`;

const StartButton = styled.button`
  background-color: #ff8d1d;
  color: white;
  border: none;
  padding: 8px 15px;
  font-size: 1rem;
  letter-spacing: 0.5px;
  font-weight: 800;
  cursor: pointer;
  margin: 15% 0% 20% 70%;
  border-radius: 5px;

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

function NicknamePage() {
  const [selectedAgeKeyword, setSelectedAgeKeyword] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [isJobSeeking, setIsJobSeeking] = useState(false);
  const [isEmployed, setIsEmployed] = useState(false);
  const history = useHistory();

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

      const isJobSeekingData = isJobSeeking;

      const response = await fetch(
        'https://coverflow.co.kr/api/member/save-member-info ',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            gender: genderData,
            age: ageRange,
            tag: isJobSeekingData,
          }),
        },
      );

      console.log('Server response status:', response.status);

      if (!response.ok) {
        throw new Error(`HTTP 오류! 상태: ${response.status}`);
      }

      const data = await response.json();
      console.log('서버 응답:', data);

      // 데이터 전송 후 mainpage로 리다이렉트
      history.push('/');
    } catch (error) {
      console.error('데이터 전송 중 에러:', error);
      console.warn('데이터를 가져오지 못했습니다.');
    }
  };

  return (
    <>
      <StyledNicknamePage className="main-page-container">
        <div className="nickname">회원 정보 설정 </div>

        <div className="nickname-info">
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
            직장을 다니고 있어요
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
        >
          시작하기
        </StartButton>
      </StyledNicknamePage>
    </>
  );
}

export default NicknamePage;
