export const tryCatch = (f, errorHandler) => {
  try {
    return f();
  } catch (error) {
    return errorHandler(error);
  }
};

export const conditionalExecution = (test, then, ELSE) => {
  if (test) return then();
  else return ELSE();
};
