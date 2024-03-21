import { useNavigate } from 'react-router-dom';
export const tryCatch = (
  f: () => void,
  errorHandler: (error: unknown) => void,
) => {
  try {
    return f();
  } catch (error) {
    return errorHandler(error);
  }
};

interface ConditionProps {
  test: () => boolean;
  execute: () => void;
}

export const conditionalExecution = (conditions: ConditionProps[]) => {
  const condition = conditions.find(({ test }) => test());
  return condition ? condition.execute() : null;
};

export const goBackToPrev = () => {
  const navigate = useNavigate();
  navigate(-1);
};

export const goBackToMain = () => {
  const navigate = useNavigate();
  navigate('/');
};
