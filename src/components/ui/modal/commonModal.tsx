import React, { ReactNode, useRef } from 'react';
import styled from 'styled-components';

type Props = {
  title?: string;
  message?: string;
  onClose?: () => void;
  confirm?: () => void;
  children?: ReactNode;
  onClick?: React.MouseEventHandler<HTMLBodyElement>;
};

const CommonModal = ({ onClose, children }: Props) => {
  const ModalRef = useRef<HTMLDivElement>(null);
  const handleClose = () => {
    onClose?.();
  };

  return (
    // <div className="Modals">
    <Wrapper>
      <Overlay onClick={handleClose}>
        <Modal ref={ModalRef}>
          <Contents onClick={(e) => e.stopPropagation()}>{children}</Contents>
        </Modal>
      </Overlay>
    </Wrapper>
    // </div>
  );
};

export default CommonModal;

const Wrapper = styled.div``;

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

// const ModalContainers = styled.section`
//   padding: 32px 52px;
//   flex-direction: column;
//   align-items: flex-start;
//   width: 2500px;
//   height: 882px;
//   overflow: hidden;
// `;

const Modal = styled.div`
  align-items: center;
  position: fixed;
  display: grid;
  gap: 16px;
  top: 50%;
  left: 50%;
  padding: 16px;
  max-width: 866px;
  height: 623px;
  border-radius: 12px;
  overflow: hidden;
  background-color: white;
  transform: translate(-50%, -50%);
  z-index: 999;
  overflow: hidden;
`;

const Contents = styled.div`
  width: 800px;
  height: 600px;
  overflow: hidden;
`;
