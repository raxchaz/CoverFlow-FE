import React from 'react';
import './contactSlider.scss';

export default function Disclamier() {
  return (
    <div>
      <div className="disclaimer">상담 시간 : 월 ~ 금 09 : 00 ~ 18 : 00</div>
      <div className={`additional-disclaimer disclaimer`}>
        (점심 시간 12 : 00 ~ 13 : 00,토 / 일 / 공휴일 휴무 )
      </div>
      <div className="disclaimer">
        등록이 완료된 문의 내용은 수정이 불가하오니 서비스 이용에 참고
        부탁드립니다.
      </div>
    </div>
  );
}
