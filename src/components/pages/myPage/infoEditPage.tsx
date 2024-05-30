import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setRewardCount } from '../../../store/actions/userActions.js';
import { useNavigate } from 'react-router-dom';
import '../../../asset/sass/pages/myPage/infoEditPage.scss';
import { StyledPage, StyledHeader } from '../../../styledComponent.js';
import TitleHeader from '../../ui/header/titleHeader';
import UserInfoHeader from '../../ui/header/userInfoHeader.jsx';
import TabBar from '../../ui/tabBar/tabBar.jsx';
import { ACCESS_TOKEN } from '../../global/constants';
import { showErrorToast, showSuccessToast } from '../../ui/toast/toast.tsx';
import { fetchAPI } from '../../global/utils/apiUtil.js';
import Button from '../../ui/button/Button/Button.jsx';

interface UserData {
  email: string;
  nickname: string;
  tag: string;
  age: string;
  gender: string;
  fishShapedBun: number;
  membStatus: 'WAIT' | 'REGISTRATION' | 'LEAVE';
  createdAt: string;
  connectedAt: string;
  role: string;
  socialType: string;
}

interface UserResponse {
  statusCode: string;
  data: UserData;
}

const Divider = styled.div`
  height: 1px;
  background-color: rgba(217, 217, 217, 1);
  width: 79%;
  margin: 3% 0% 0% 12%;
`;

const genderMapping = {
  Female: '여성',
  Male: '남성',
  Unknown: '밝히고 싶지 않음',
};

const ageMapping = {
  '10-19': '10대',
  '20-29': '20대',
  '30-39': '30대',
  '40-49': '40대',
  '50-59': '50대',
  '60-': '60대 이상',
};

const ageReverseMapping = {
  '10대': '10-19',
  '20대': '20-29',
  '30대': '30-39',
  '40대': '40-49',
  '50대': '50-59',
  '60대 이상': '60-',
};

function InfoEditPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [initialTag, setInitialTag] = useState('');
  const [initialGender, setInitialGender] = useState('');
  const [initialAge, setInitialAge] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedAge, setSelectedAge] = useState('');

  const handleSelectTag = (tag: string) => setSelectedTag(tag);
  const handleSelectGender = (gender: string) => setSelectedGender(gender);
  const handleSelectAge = (age: string) => setSelectedAge(age);

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    if (!token) {
      localStorage.setItem('mypageURL', '/mypage');
      navigate('/login');
    } else {
      loadUserData();
    }
  }, []);

  const loadUserData = async () => {
    try {
      const data = (await fetchAPI('/api/member/me', 'GET')) as UserResponse;
      setNickname(data.data.nickname);
      setInitialTag(data.data.tag);
      setInitialGender(genderMapping[data.data.gender]);
      setInitialAge(ageMapping[data.data.age]);
      setSelectedTag(data.data.tag);
      setSelectedGender(genderMapping[data.data.gender]);
      setSelectedAge(ageMapping[data.data.age]);
      dispatch(setRewardCount(data.data.fishShapedBun));
    } catch (error) {
      console.error(error);
    }
  };

  const sendDataToServer = async () => {
    try {
      if (selectedTag === '' || selectedAge === '' || selectedGender === '') {
        showErrorToast('선택된 정보가 없습니다.');
        return;
      }

      const body = {
        tag: selectedTag,
        age: ageReverseMapping[selectedAge],
        gender: {
          여성: 'Female',
          남성: 'Male',
          '밝히고 싶지 않음': 'Unknown',
        }[selectedGender],
      };

      if (selectedTag && selectedAge && selectedGender) {
        await fetchAPI('/api/member', 'PATCH', body);
        showSuccessToast('성공적으로 정보를 수정했습니다.');
        navigate('/mypage');
      }
    } catch (error) {
      console.error(error);
      showErrorToast('정보 수정 중 오류가 발생했습니다.');
    }
  };

  const handleGoBack = () => {
    navigate('/');
  };

  const goToSecessionPage = () => {
    navigate('/secession-page', { state: { nickname } });
  };

  const handleModifyNickname = async () => {
    try {
      const data = await fetchAPI('/api/member/nickname', 'PATCH');
      setNickname(data.nickname);
      showSuccessToast('닉네임이 성공적으로 변경되었습니다.');
    } catch (error) {
      showErrorToast('닉네임 변경 중 예상치 못한 오류가 발생했습니다.');
    }
  };

  const isDataChanged = () => {
    return (
      initialTag !== selectedTag ||
      initialGender !== selectedGender ||
      initialAge !== selectedAge
    );
  };

  return (
    <StyledPage className="main-page-container">
      <StyledHeader>
        <TitleHeader pageTitle="내 정보 수정" handleGoBack={handleGoBack} />
        <UserInfoHeader />

        <div className="modify-nick-container">
          <div className="modify-info">
            <span className="modify-nick">닉네임</span>
            <div className="modify-nick-info">
              <span className="modify-nickname">{nickname}</span>
              <div className="modify-nickname-btn" onClick={handleModifyNickname}>
                변경
              </div>
            </div>
            <div className="nick-disclaimer">* 닉네임 변경 시, 붕어빵 20개가 차감됩니다 </div>
          </div>
        </div>
        <Divider />
        <div className="modify-info">
          <div className="modify-nick">회원 태그</div>
          <div className="modify-info-wrapper">
            {['취준생', '현업자'].map((tag) => (
              <div
                key={tag}
                className={`modify-info-btn ${selectedTag === tag ? 'selected' : 'default'}`}
                onClick={() => handleSelectTag(tag)}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
        <div className="modify-info">
          <div className="modify-nick">성별</div>
          <div className="modify-info-wrapper">
            {['여성', '남성', '밝히고 싶지 않음'].map((gender) => (
              <div
                key={gender}
                className={`modify-info-btn ${selectedGender === gender ? 'selected' : 'default'}`}
                onClick={() => handleSelectGender(gender)}
              >
                {gender}
              </div>
            ))}
          </div>
        </div>
        <div className="modify-info">
          <div className="modify-nick">연령대</div>
          <div className="modify-info-wrapper">
            {['10대', '20대', '30대'].map((age) => (
              <div
                key={age}
                className={`modify-info-btn ${selectedAge === age ? 'selected' : 'default'}`}
                onClick={() => handleSelectAge(age)}
              >
                {age}
              </div>
            ))}
          </div>
          <div className="modify-info-wrapper">
            {['40대', '50대', '60대'].map((age) => (
              <div
                key={age}
                className={`modify-info-btn ${selectedAge === age ? 'selected' : 'default'}`}
                onClick={() => handleSelectAge(age)}
              >
                {age}
              </div>
            ))}
          </div>
          <Button
            disabled={!isDataChanged()}
            onClick={sendDataToServer}
          >
            저장
          </Button>
        </div>

        <Divider />

        <div className="secessionPage-container">
          <div className="secessionUser-info">
            <div className="modify-nick">회원 탈퇴</div>
            <div className="userSecession-info">
              회원 탈퇴를 할 경우, 계정을 되돌릴 수 없고 모든 데이터가 삭제됩니다
            </div>
            <Button onClick={goToSecessionPage}>탈퇴</Button>
          </div>
        </div>
      </StyledHeader>
      <TabBar />
    </StyledPage>
  );
}

export default InfoEditPage;
