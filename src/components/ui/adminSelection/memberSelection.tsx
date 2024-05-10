import React, { useState } from 'react';
import './memberSelection.scss';
import AdminSearch from '../../../asset/image/admin-search.svg';
import Button from '../button/Button/Button';
import { ACCESS_TOKEN, BASE_URL } from '../../global/constants';
import Calendar from '../calendar/calendar';

export default function MemberSelection() {
  const [isLoading, setIsLoading] = useState(false);
  const fetchMember = (pageNo: number) => {
    const queryParams = new URLSearchParams({
      pageNo: pageNo.toString(),
      criterion: 'createdAt',
    });
    const url = `${BASE_URL}/api/member/admin?${queryParams.toString()}`;
    fetch(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data: Response) => {
        // console.log(data);
      })
      .catch((error) => {
        // console.error('Error:', error);
        setIsLoading(false);
      });
  };
  // console.log(fetchMember(0));

  return (
    <div className="ad-memberSelection-container">
      <div className="ad-search">
        <div className="search-container">
          <div className="search-row">
            <select className="search-divider" name="searchOpt" id="searchOpt">
              <option value=""></option>
              <option value="옵션1">옵션1</option>
              <option value="옵션2">옵션2</option>
            </select>
            <input
              className="search-prompt"
              placeholder="검색어를 입력해주세요"
            />
          </div>
          <img className="search-icon" src={AdminSearch} alt="Search" />
        </div>
      </div>
      <>
        <div className="ad-memberOption">
          <div className="ad-memberitem-direction">
            <div className="ad-memberOption-maxitem">
              <span className="ad-member-title">가입일</span>
              <input type="checkbox" className="ad-member-checkbox" />
              <span className="ad-member-total">전체</span>
            </div>
            <div className="ad-memberSelection-Calendar">
              <Calendar />
            </div>
          </div>

          <div className="ad-memberOption-item">
            <span className="ad-member-title">회원상태</span>
            <select className="ad-searchOption-select">
              <option value=""></option>
            </select>
          </div>
          <div className="ad-memberOption-item">
            <span className="ad-member-title">회원권한</span>
            <select className="ad-searchOption-select">
              <option value=""></option>
            </select>
          </div>
          <div className="ad-memberitem-direction">
            <div className="ad-memberOption-maxend">
              <span className="ad-member-title">최종로그인</span>
              <div className="ad-member-Calendar">
                <Calendar />
              </div>
            </div>
          </div>
        </div>
        <div className="ad-searchResult">
          <div className="admin-btn-wrapper">
            <Button variant="admin" onClick={() => {}}>
              검색
            </Button>
            <Button variant="admin-white" onClick={() => {}}>
              초기화
            </Button>
          </div>

          <div className="ad-member-result">
            <ul>
              <li className="ad-memberResult-header">
                <input type="checkbox" />
                <span>번호</span>
                <span>계정</span>
                <span>닉네임</span>
                <span>붕어빵</span>
                <span>성별</span>
                <span>연령대</span>
                <span>관리</span>
              </li>
            </ul>
          </div>
        </div>
      </>
    </div>
  );
}
