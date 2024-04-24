import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NotFoundPage from '../components/NotFoundPage';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: ErrorFallbackProps) {
  const navigate = useNavigate();

  useEffect(() => {
    console.error(error);
    if (window.location.pathname === '/notfound') {
      navigate('/home');
    } else {
      navigate('/notfound');
    }

    const handlePopState = () => {
      resetErrorBoundary();
    };
    handlePopState();
  }, [navigate, resetErrorBoundary]);

  return <NotFoundPage />;
}
