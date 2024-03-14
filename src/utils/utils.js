export const tryCatch = (f, errorHandler) => {
  try {
    return f();
  } catch (error) {
    return errorHandler(error);
  }
};

export const conditionalExecution = (then, test, ELSE) => {
  if (test) return then();
  return ELSE();
};
