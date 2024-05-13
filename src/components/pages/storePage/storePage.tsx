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
import UserInfoHeader from '../../ui/header/userInfoHeader.jsx';
import { showErrorToast } from '../../ui/toast/toast.tsx';

function StorePage() {
  const navigate = useNavigate();
  // const [purchaseList, setPurchaseList] = useState([
  //   { fishShapeBun: 0, price: 0, cnt: 0, date: '' },
  // ]);
  useEffect(() => {
    // setPurchaseList(() => [
    //   { fishShapeBun: 200, price: 2000, cnt: 2, date: '2024-03-02' },
    //   { fishShapeBun: 200, price: 2000, cnt: 2, date: '2024-03-02' },
    // ]);

    const token = localStorage.getItem(ACCESS_TOKEN);

    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const goWIL = () => {
    showErrorToast("현재 준비중이에요")
    // navigate('/work-progress');
  };

  return (
    <StyledPage className="main-page-container">
      <StyledHeader>
        <TitleHeader pageTitle="상점" handleGoBack={handleGoBack} />
        <UserInfoHeader />
        <TabBar />
        <div className="store-container">
          <SelectSlider sectionA="붕어빵 구매하기" sectionB="나의 구매내역">
            <div className="store-wrapper">
              <CurrentFishBanner />
              <div className="fish-list-container">
                <FishListItem payEvent={goWIL} price="1,900원">
                  붕어빵 100개
                </FishListItem>
                <FishListItem payEvent={goWIL} price="4,900원">
                  붕어빵 300개
                </FishListItem>
                <FishListItem payEvent={goWIL} price="9,900원">
                  붕어빵 700개
                </FishListItem>
              </div>
            </div>
            <div className="store-wrapper">
              <CurrentFishBanner />

              {/* {purchaseList.length > 0 ? ( */}
                {/* <div className="fish-purchase-list">
                  {purchaseList.map((item, index) => (
                    <div key={index} className="fish-purchase-item">
                      <div>
                        <div className="fishbun-cnt">
                          붕어빵 {item.fishShapeBun}개
                        </div>
                        <div className="fishbun-price">
                          {item.price}원<span>X 총{item.cnt}개</span>
                        </div>
                      </div>
                      <div className="fishbun-price">
                        구입<span> {item.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : ( */}
                <div className="no-fish-purchase">
                  <img
                    src={FaceIcon}
                    alt="구매 내역 없음"
                    className="no-result"
                  />
                  <span className="fish-disclaimer">구매 내역이 없어요</span>
                </div>
              {/* )} */}
            </div>
          </SelectSlider>
        </div>
      </StyledHeader>
    </StyledPage>
  );
}

export default StorePage;
