// import React, { useRef } from 'react';
import React from 'react';
// import CommonModal from './commonModal';
// import { useOutSideClick } from './useOutsideClick';
// import { ModalContainer } from './modalContainer';
import CommonModal from './commonModal';
import { styled } from 'styled-components';
import Button from '../button/Button/Button';
import {
  MemberAuthorType,
  MemberState,
} from '../../global/constants/adminOption';
// import { fetchAPI } from '../../global/utils/apiUtil';

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

type ModalProps = {
  close?: () => void;
  open?: boolean;
  children?: React.ReactNode;
  // onClick?: () => void;
  onClick?: React.MouseEventHandler<HTMLBodyElement>;
  member?: Member;
  // showMemberModals?: (member:string) => void;
  handleSearch: () => void;
  showMemberList: () => void;
};

const MemberModals = ({
  close,
  member,
  // handleSearch,
  // showCompanyList,
}: ModalProps) => {
  // const [editedMember, setEditedMember] = useState(member as Member);
  // console.log(editedMember);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setEditedMember((prev: Member) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  // const handleMemberUpdate = async () => {
  //   try {

  //   }
  // };

  return (
    <div>
      <CommonModal onClose={close}>
        {/* <Inners onClick={(e) => e.stopPropagation()}> */}
        <Inners>
          <InnerTitle>회원 기본 정보</InnerTitle>
          <MemberTables key={member?.id}>
            <MemberKind>닉네임</MemberKind>
            <Memberapis>{member?.nickname}</Memberapis>
            <MemberKind>계정</MemberKind>
            <Memberapis>{member?.email}</Memberapis>
            <MemberKind>가입일</MemberKind>
            <Memberapis>{member?.createdAt}</Memberapis>
            <MemberKind>최종로그인</MemberKind>
            <Memberapis>{member?.connectedAt}</Memberapis>
          </MemberTables>
          <InnersubTitle>회원 권한 변경</InnersubTitle>
          <MemberStateContainer>
            <StateTitle>회원 상태</StateTitle>
            <StateSelection
              className="ad-searchOption-select"
              value={member?.memberStatus}
            >
              <option value=""></option>
              {MemberState.map((memberStatus) => (
                <option key={memberStatus.key} value={memberStatus.key}>
                  {memberStatus.value}
                </option>
              ))}
            </StateSelection>
          </MemberStateContainer>
          <MemberStateContainer>
            <StateTitle>회원 권한</StateTitle>
            <StateSelection
              className="ad-searchOption-select"
              value={member?.role}
            >
              <option value=""></option>
              {MemberAuthorType.map((role) => (
                <option key={role.key} value={role.key}>
                  {role.value}
                </option>
              ))}
            </StateSelection>
          </MemberStateContainer>
          <ButtonContainer>
            <Button variant="admin" onClick={() => close}>
              수정
            </Button>
            {/* <ModalButton onClose={close}>
              수정
            </ModalButton> */}
          </ButtonContainer>
        </Inners>
      </CommonModal>
    </div>
  );
};

const Inners = styled.div`
  align-content: left;
  padding-left: 50px;
  padding-top: 70px;
`;

const InnerTitle = styled.p`
  font-size: 20px;
  font-weight: bold;
  padding-bottom: 20px;
`;
const InnersubTitle = styled.p`
  font-size: 20px;
  font-weight: bold;
  padding-bottom: 20px;
  padding-top: 50px;
`;

const MemberTables = styled.div`
  width: 702px;
  height: 146px;
  border: 1px solid black;
  display: grid;
  grid-template-columns: 104px 599px;
  grid-template-rows: 36.5px 36.5px 36.5px 36.5px;
`;

const MemberKind = styled.div`
  border: 1px solid black;
  width: 104px;
  text-align: center;
  padding-top: 10px;
  font-size: 16px;
  background-color: #a8a8a8;
`;

const Memberapis = styled.div`
  border: 1px solid black;
  width: 599px;
  text-align: left;
  padding-left: 10px;
  padding-top: 10px;
  font-size: 16px;
`;

const MemberStateContainer = styled.div`
  display: flex;
  padding-bottom: 2%;

  /* justify-content: space-between; */
  align-items: center;
`;
const StateTitle = styled.p`
  font-size: 17px;
  padding-right: 20px;
`;
const StateSelection = styled.select`
  padding-left: 20px;
  width: 163px;
  height: 28px;
  background-color: rgba(217, 217, 217, 1);
  border: none;
`;

const ButtonContainer = styled.div`
  align-items: center;
  padding-left: 280px;
`;

// const ModalButton = styled.button`
//   background-color: #ff8d1d;
//   width: 122px;
//   height: 38px;
//   text-align: center;
// `;

export default MemberModals;
