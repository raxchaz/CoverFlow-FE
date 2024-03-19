interface TryCatchProps {
  f: () => void;
  errorHandler: (error: any) => void;
}

export const tryCatch = ({ f, errorHandler }: TryCatchProps) => {
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
