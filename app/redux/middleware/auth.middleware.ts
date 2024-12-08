import {authApi} from '../../api/auth/authApi';

export const authMiddleware =
  (store: {dispatch: (arg0: any) => any}) =>
  (next: (arg0: any) => any) =>
  async (action: {
    type: string;
    error: any;
    payload: {status: number};
    meta: {
      retry: any;
      arg: any;
    };
  }) => {
    if (
      action.type.endsWith('rejected') &&
      action.error &&
      action.payload?.status === 401 &&
      !action.meta?.retry &&
      !['login', 'register', 'refreshToken'].includes(
        action.meta?.arg?.endpointName,
      )
    ) {
      const refreshAction = await store.dispatch(
        authApi.endpoints.refreshToken.initiate(),
      );

      if (authApi.endpoints.refreshToken.matchFulfilled(refreshAction)) {
        const originalArg = action.meta.arg;
        return store.dispatch({
          ...action,
          meta: {...action.meta, arg: originalArg, retry: true},
        });
      }
    }
    return next(action);
  };
