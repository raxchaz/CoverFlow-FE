// import React, { useRef } from 'react';
import React from 'react';
// import CommonModal from './commonModal';
// import { useOutSideClick } from './useOutsideClick';
// import { ModalContainer } from './modalContainer';
import CommonModal from './commonModal';
import { styled } from 'styled-components';

type ModalProps = {
  close?: () => void;
  open?: boolean;
  children?: React.ReactNode;
};

const MemberModals = ({ close }: ModalProps) => {
  return (
    <div>
      <CommonModal onClose={close}>
        <Inners onClick={(e) => e.stopPropagation()}>
          <InnerTitle>회원 기본 정보</InnerTitle>
        </Inners>
      </CommonModal>
    </div>
  );
};

const Inners = styled.div`
  align-content: center;
  padding-left: 50px;
  padding-top: 70px;
  /* width: 100%; */
`;

const InnerTitle = styled.p`
  font-size: 20px;
  font-weight: bold;
`;

export default MemberModals;
