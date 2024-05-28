// import React, { useRef } from 'react';
import React from 'react';
// import CommonModal from './commonModal';
// import { useOutSideClick } from './useOutsideClick';
// import { ModalContainer } from './modalContainer';
import CommonModal from './commonModal';

type ModalProps = {
  close?: () => void;
  open?: boolean;
  children?: React.ReactNode;
};

const CompanyModals = ({ close }: ModalProps) => {
  return (
    <div>
      <CommonModal onClose={close}>
        <div>멤버스멤버스</div>
      </CommonModal>
    </div>
  );
};

export default CompanyModals;
