import {ApiError} from './auth/authApi';

const isApiError = (error: unknown): error is ApiError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'data' in error &&
    typeof (error as any).data === 'object' &&
    error.data !== null &&
    'message' in (error as any).data
  );
};

export const transformApiError = (error: unknown): string => {
  if (isApiError(error)) {
    return error.data.message;
  }
  return 'An unknown error happened';
};
