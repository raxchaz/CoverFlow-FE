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
    navigate('/');

    const handlePopState = () => {
      resetErrorBoundary();
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate, resetErrorBoundary]);

  return <NotFoundPage />;
}
