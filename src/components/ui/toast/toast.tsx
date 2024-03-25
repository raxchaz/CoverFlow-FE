import React from 'react';
import { toast, ToastOptions, ToastContainer } from 'react-toastify';
import errorIcon from '../../../asset/image/toast-error.svg';
import successIcon from '../../../asset/image/toast-success.svg';
import styled from 'styled-components';

// ToastContainer를 커스텀 스타일링
export const StyledToastContainer = styled(ToastContainer)`
  margin-top: 60px;
  .Toastify__toast {
    background-color: black;
    color: white;
    font: pretendard-regular;
  }
  .Toastify__close-button {
    display: none;
  }
`;

const baseToastOptions: ToastOptions = {
  position: 'top-center',
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  closeButton: false,
  style: {
    textAlign: 'center',
  },
};

export const showSuccessToast = (message: string) => {
  toast.success(message, {
    ...baseToastOptions,
    icon: <img src={successIcon} alt="success" />,
    style: {
      ...baseToastOptions.style,
      background: 'black',
      color: 'white',
      font: 'pretendard-regular',
    },
  });
};

export const showErrorToast = (message: string) => {
  toast.error(message, {
    ...baseToastOptions,
    icon: <img src={errorIcon} alt="error" />,
    style: {
      ...baseToastOptions.style,
      background: 'black',
      color: 'white',
      font: 'pretendard-regular',
    },
  });
};
