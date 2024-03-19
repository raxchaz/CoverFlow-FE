import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../asset/sass/pages/storePage/storePage.scss';

import FaceIcon from '../../../asset/image/faceicon.svg';
import { StyledHeader, StyledPage } from '../../../styledComponent';
import TitleHeader from '../../ui/header/titleHeader';
import TabBar from '../../ui/tabBar/tabBar';
import SelectSlider from '../../ui/selectSlider/selectSlider';
import { CurrentFishBanner } from '../../ui/banner/currentFishBanner';
import { ACCESS_TOKEN } from '../../global/constants';
import FishListItem from '../../ui/selection/fishListItem.tsx';

function StorePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <StyledPage className="main-page-container">
      <StyledHeader>
        <TitleHeader pageTitle="상점" handleGoBack={handleGoBack} />

        <TabBar />
        <SelectSlider sectionA="붕어빵 구매하기" sectionB="나의 구매내역">
          <div className="store-wrapper">
            <CurrentFishBanner />
            <div className="fish-list-container">
              <FishListItem payEvent={() => alert('준비 중')} price="1,900원">
                붕어빵 100개
              </FishListItem>
              <FishListItem payEvent={() => alert('준비 중')} price="4,900원">
                붕어빵 300개
              </FishListItem>
              <FishListItem payEvent={() => alert('준비 중')} price="9,900원">
                붕어빵 700개
              </FishListItem>
            </div>
          </div>
          <div className="store-wrapper">
            <CurrentFishBanner />
            <div className="no-fish-purchase">
              <img src={FaceIcon} alt="구매 내역 없음" className="no-result" />
              <span className="fish-disclaimer">
                붕어빵 구매 내역이 없습니다.
              </span>
            </div>
          </div>
        </SelectSlider>
      </StyledHeader>
    </StyledPage>
  );
}

export default StorePage;
