import React from 'react';
import Banner from '../../../asset/image/banner.svg';
import Chat from '../../../asset/image/chaticon.svg';

const BannerImage = () => {
  return (
    <div className="banner">
      <div className="banner-text">
        <span>한번의 결제,</span>
        <span>제한 없는 정보 공유</span>
      </div>
      <img src={Banner} alt="banner" />
      <img
        style={{ position: 'absolute', padding: 0, right: 0 }}
        src={Chat}
        alt="banner"
      />
    </div>
  );
};

export default BannerImage;
