export const successResponse = ({
  message = 'Data fetched Successfully',
  result = {},
  status = 200,
}) => ({
  status,
  success: true,
  message,
  result,
});

export const errorResponse = ({
  message = 'An error occurred',
  status = 500,
}) => ({
  status,
  success: false,
  message,
});

export const responseMessage = {
  ERROR: {
    INTERNAL_SERVER_ERROR: 'Internal Server Error',
  },
};

export const ERROR_MESSAGES = {
  REDIS_CONNECTION_FAILED: 'Failed to connect to Redis',
};

export const ROUTES = {
  DATABASE: 'datasources',
  TEST: '/test',
};

