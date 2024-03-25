import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import '../../../asset/sass/pages/myPage/infoEditPage.scss';
import { StyledPage, StyledHeader } from '../../../styledComponent.js';
import TitleHeader from '../../ui/header/titleHeader';
import UserInfoHeader from '../../ui/header/userInfoHeader.jsx';
import TabBar from '../../ui/tabBar/tabBar.jsx';
import { BASE_URL, ACCESS_TOKEN } from '../../global/constants';
import { showErrorToast, showSuccessToast } from '../../ui/toast/toast.tsx';

const Divider = styled.div`
  height: 1px;
  background-color: rgba(217, 217, 217, 1);
  width: 79%;
  margin: 5% 0% 0% 12%;
`;

const ModifyInfoBtn = styled.button`
  cursor: pointer;
  padding: 7px 8px;
  font-family: pretendard-light;
  border-radius: 1px;
  width: 79%;
  margin: 5% 0% 0% 12%;
`;

const SecessionBtn = styled.button`
  cursor: pointer;
  padding: 7px 8px;
  font-family: pretendard-light;
  border-radius: 1px;
  margin: 5% 0% 20% 0%;
  width: 100%;
`;

function InfoEditPage() {
  const navigate = useNavigate();
  // const [userInfo, setUserInfo] = useState({ socialType: ' ' });
  const [nickname, setNickname] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedAge, setSelectedAge] = useState('');

  const handleSelectTag = (tag) => setSelectedTag(tag);
  const handleSelectGender = (gender) => setSelectedGender(gender);
  const handleSelectAge = (age) => setSelectedAge(age);

  /* 사용자의 토큰이 존재한다면, 사용자의 정보를 가져옵니다. */
  useEffect(() => {
    // setNickname(''); // 렌덜이 전에 사용자의 nickname을 초기화!
    const token = localStorage.getItem(ACCESS_TOKEN);

    if (!token) {
      localStorage.setItem('mypageURL', '/mypage');
      navigate('/login');
    } else {
      loadUserData();
    }
  }, [nickname]);

  /* 사용자의 닉네임과 붕어빵 개수를 불러옵니다. */
  const loadUserData = () => {
    fetch(`${BASE_URL}/api/member/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('사용자 정보:', data);
        setNickname(data.data.nickname);
      })
      .catch((error) => console.error('회원 정보 불러오기 실패:', error));
  };

  const handleGoBack = () => {
    navigate('/');
  };

  const goToSecessionPage = () => {
    navigate('/secession-page');
  };

  const handleModifyNickname = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/member`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      });

      const data = await response.json();

      setNickname(data.nickname);
      showSuccessToast('닉네임이 성공적으로 변경되었습니다.');
    } catch (error) {
      showErrorToast('닉네임 변경 중 예상치 못한 오류가 발생했습니다.');
    }
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
              <div
                className="modify-nickname-btn"
                onClick={handleModifyNickname}
              >
                변경
              </div>
            </div>
          </div>
        </div>
        <Divider />
        <div className="modify-info">
          <span className="modify-nick">회원 태그</span>
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
          <span className="modify-nick">성별</span>
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
          <span className="modify-nick">연령대</span>
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
        </div>
        <ModifyInfoBtn>저장</ModifyInfoBtn>
        <Divider />

        <div className="secessionPage-container">
          <div className="secessionUser-info">
            <div className="modify-nick">회원 탈퇴</div>
            <div className="userSecession-info">
              회원 탈퇴를 할 경우, 계정을 되돌릴 수 없고 모든 데이터가
              삭제됩니다
            </div>
            <SecessionBtn onClick={goToSecessionPage}>탈퇴</SecessionBtn>
          </div>
        </div>
      </StyledHeader>
      <TabBar />
    </StyledPage>
  );
}

export default InfoEditPage;
