import { toast, ToastOptions } from 'react-toastify';

const baseToastOptions: ToastOptions = {
  position: 'top-center',
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  style: {
    textAlign: 'center',
  },
};

export const showSuccessToast = (message: string) => {
  toast.success(message, {
    ...baseToastOptions,
    style: { ...baseToastOptions.style, background: 'black', color: 'white' },
  });
};

export const showErrorToast = (message: string) => {
  toast.error(message, {
    ...baseToastOptions,
    style: { ...baseToastOptions.style, background: 'black', color: 'white' },
  });
};
