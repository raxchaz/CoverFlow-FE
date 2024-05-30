// import React, { useRef } from 'react';
import React from 'react';
// import CommonModal from './commonModal';
// import { useOutSideClick } from './useOutsideClick';
// import { ModalContainer } from './modalContainer';
import CommonModal from './commonModal';
import { styled } from 'styled-components';
import Button from '../button/Button/Button';

interface AdminAnswer {
  answerId: number;
  questionId: number;
  answerContent: string;
  selection: string;
  answererNickname: string;
  memberType: string;
  answererTag: string;
  answerStatus: string;
}

type ModalProps = {
  close?: () => void;
  open?: boolean;
  children?: React.ReactNode;
  // onClick?: () => void;
  onClick?: React.MouseEventHandler<HTMLBodyElement>;
  answers: AdminAnswer;
  handleSearch: () => void;
  showAList: () => void;
};

const AnswerModals = ({ close, answers }: ModalProps) => {
  return (
    <div>
      <CommonModal onClose={close}>
        <Inners onClick={(e) => e.stopPropagation()}>
          <InnerTitle>답변 기본 정보</InnerTitle>
          <AnswerTables key={answers.answerId}>
            <MemberKind>질문번호</MemberKind>
            <Answerapis>{answers.questionId}</Answerapis>
            <MemberKind>답변번호</MemberKind>
            <Answerapis>{answers.answerId}</Answerapis>
            <MemberKind>작성자</MemberKind>
            <Answerapis>{answers.answererNickname}</Answerapis>
            <MemberKind>채택여부</MemberKind>
            <Answerapis>{answers.answerStatus}</Answerapis>
          </AnswerTables>
          <InnersubTitle>답변 상태 변경</InnersubTitle>
          <AnswerStateContainer>
            <StateTitle>답변 상태</StateTitle>
            <StateSelection>
              <option value=""></option>
            </StateSelection>
          </AnswerStateContainer>
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

const AnswerTables = styled.div`
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

const Answerapis = styled.div`
  border: 1px solid black;
  width: 599px;
  text-align: left;
  padding-left: 10px;
  padding-top: 10px;
  font-size: 16px;
`;

const AnswerStateContainer = styled.div`
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

export default AnswerModals;
