export const handleApiError = (error, defaultMessage = 'Operation failed') => {
  const message = error.response?.data?.message ?? error.message ?? defaultMessage;

  return {
    success: false,
    message,
  };
};

export const isSuccessResponse = (response) => {
  return response?.success !== false && response !== null && response !== undefined;
};

export const successResponse = (data, message = 'Success') => {
  return {
    success: true,
    message,
    data,
  };
};
