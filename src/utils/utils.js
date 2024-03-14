export const tryCatch = (f, errorHandler) => {
  try {
    return f();
  } catch (error) {
    return errorHandler(error);
  }
};

export const conditionalExecution = (conditions) => {
  const condition = conditions.find(({ test }) => test());
  return condition ? condition.execute() : null;
};
