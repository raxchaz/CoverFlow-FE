import React, { useEffect, useState } from 'react';
import './memberSelection.scss';
import AdminSearch from '../../../asset/image/admin-search.svg';
import Button from '../button/Button/Button';
import { ACCESS_TOKEN, BASE_URL } from '../../global/constants';
import Calendar from '../calendar/calendar';
import AdminPagination from './adminPagination';
import { Role, MemberStatus } from '../../global/constants/adminOption';
import Portal from '../modal/portal';
import MemberModals from '../modal/memberModal';

interface Member {
  id: string;
  nickname: string;
  email: string;
  gender: string;
  memberType: string;
  role: string;
  memberStatus: string;
  status: string;
  fishShapedBun: number;
  age: string;
  createdAt?: string;
  connectedAt?: string;
}

interface ApiResponse {
  statusCode: string;
  data: {
    totalPages: number;
    members: Member[];
    totalElements: number;
  };
}

export default function MemberSelection() {
  const [isLoading, setIsLoading] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);
  const [totalMemberCount, seTtotalMemberCoun] = useState(0);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedMember, setSelectedMember] = useState(null);
  const [role, setRole] = useState('');
  const [memberStatus, setMemberStatus] = useState('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const open = () => {
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    fetchMember(currentPage);
  }, [currentPage]);

  const handlePagination = (direction) => {
    if (direction === 'prev' && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else if (direction === 'next' && currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else if (typeof direction === 'number') {
      setCurrentPage(direction);
    }
  };

  const fetchMember = (pageNo: number) => {
    setIsLoading(true);
    const queryParams = new URLSearchParams({
      pageNo: pageNo.toString(),
      criterion: 'createdAt',
    });

    if (role) {
      queryParams.set('Role', role);
    }
    if (memberStatus) {
      queryParams.set('MemberStatus', memberStatus);
    }

    const url = `${BASE_URL}/api/member/admin?${queryParams.toString()}`;
    fetch(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data: ApiResponse) => {
        console.log(data);
        setMembers(data.data.members);
        setTotalPages(data.data.totalPages);
        seTtotalMemberCoun(data.data.totalElements);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setIsLoading(false);
      });
  };

  const showMemberModals = (member) => {
    setSelectedMember(member);
  };

  const showMemberList = () => {
    setSelectedMember(null);
  };

  const handleSearch = () => {
    setCurrentPage(0);
    fetchMember(0);
  };

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
      {selectedMember ? (
        <>
          <MemberModals
            close={close}
            member={selectedMember}
            showMemberList={showMemberList}
            handleSearch={handleSearch}
          />
        </>
      ) : (
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
              <select
                className="ad-searchOption-select"
                value={memberStatus}
                onChange={(e) => setMemberStatus(e.target.value)}
              >
                <option value=""></option>
                {MemberStatus.map((memberStatus) => (
                  <option key={memberStatus.key} value={memberStatus.key}>
                    {memberStatus.value}
                  </option>
                ))}
              </select>
            </div>
            <div className="ad-memberOption-item">
              <span className="ad-member-title">회원권한</span>
              <select
                className="ad-searchOption-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value=""></option>
                {Role.map((role) => (
                  <option key={role.key} value={role.key}>
                    {role.value}
                  </option>
                ))}
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
              <Button variant="admin" onClick={handleSearch}>
                검색
              </Button>
              <Button
                variant="admin-white"
                onClick={() => {
                  setMemberStatus('');
                  setRole('');
                  setCurrentPage(0);
                }}
              >
                초기화
              </Button>
            </div>
            {isLoading ? (
              <p>로딩 중...</p>
            ) : (
              <div>
                <p className="ad-member-cnt">
                  <span className="ad-member-num">{totalMemberCount}</span>건의
                  기업이 검색되었습니다.
                </p>

                <div className="ad-member-result">
                  <ul>
                    <li className="ad-memberResult-header">
                      <input type="checkbox" />
                      <span>번호</span>
                      <span>UUID</span>
                      <span>계정</span>
                      <span>닉네임</span>
                      <span>붕어빵</span>
                      <span>성별</span>
                      <span>연령대</span>
                      <span>관리</span>
                    </li>
                    {members.map((member, index) => {
                      const itemNumber = index + 1 + currentPage * itemsPerPage;
                      return (
                        <li key={member.id} className="ad-memberResult-item">
                          <input type="checkbox" />
                          <span>{itemNumber}</span>
                          <span>{member.id}</span>
                          <span>{member.email}</span>
                          <span>{member.nickname}</span>
                          <span>{member.fishShapedBun}</span>
                          <span>{member.gender}</span>
                          <span>{member.age}</span>
                          {/* <span>{member.role}</span> */}
                          <span
                            onClick={open}
                            onSubmit={() => showMemberModals(member)}
                            // onChange={() => showMemberModals(member)}
                          >
                            <span className="ad-memberdetail">관리 변경</span>
                          </span>
                          {isOpen && (
                            <Portal>
                              <MemberModals
                                close={close}
                                showMemberList={showMemberList}
                                handleSearch={handleSearch}
                                member={member}
                              />
                            </Portal>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="ad-member-pagination">
                  {members && (
                    <AdminPagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      handlePagination={handlePagination}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
