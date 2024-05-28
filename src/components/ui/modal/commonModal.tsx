import React, { ReactNode, useRef } from 'react';
import styled from 'styled-components';
import { useOutSideClick } from './useOutsideClick';

type Props = {
  title?: string;
  message?: string;
  onClose?: () => void;
  confirm?: () => void;
  children?: ReactNode;
};

const CommonModal = ({ onClose, children }: Props) => {
  const ModalRef = useRef<HTMLDivElement>(null);
  const handleClose = () => {
    onClose?.();
    document.body.style.overflow = 'unset';
  };

  useOutSideClick({ ref: ModalRef, handler: handleClose });

  return (
    <div className="Modals">
      <Overlay ref={ModalRef}>
        <Modal>
          <div>{children}</div>
        </Modal>
      </Overlay>
    </div>
  );
};

export default CommonModal;

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 9999;
  overflow: hidden;
`;
const Modal = styled.div`
  align-items: center;
  position: fixed;
  display: grid;
  gap: 16px;
  top: 50%;
  left: 50%;
  padding: 16px;
  width: 866px;
  height: 623px;
  /* max-width: 400px; */
  border-radius: 12px;
  overflow: hidden;
  background-color: white;
  transform: translate(-50%, -50%);
  z-index: 999;
  overflow: hidden;
`;
