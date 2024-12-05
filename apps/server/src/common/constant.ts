export const sucessResponseObj = (data, status) => {
  return {
    data,
    errorDisplay: '',
    responseMeta: { status, success: true },
  };
};
