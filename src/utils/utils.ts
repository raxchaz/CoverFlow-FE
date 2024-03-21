import { ACCESS_TOKEN } from '../components/global/constants';

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

export const setHeaders = () => {
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
    },
  };
};
