import {listenerMiddleware} from '../../redux/store';
import {authApi} from './authApi';

export function loginListener(middleware: typeof listenerMiddleware) {
  let initialRefreshTimeout: NodeJS.Timeout | undefined;
  let refreshTimeout: NodeJS.Timeout | undefined;

  middleware.startListening({
    matcher: authApi.endpoints.login.matchFulfilled,
    effect: (_action, {dispatch}) => {
      initialRefreshTimeout = setTimeout(() => {
        dispatch(authApi.endpoints.refreshToken.initiate());
      }, 4 * 60 * 1000);
    },
  });

  middleware.startListening({
    matcher: authApi.endpoints.refreshToken.matchFulfilled,
    effect: (_action, {dispatch}) => {
      refreshTimeout = setTimeout(() => {
        dispatch(authApi.endpoints.refreshToken.initiate());
      }, 4 * 60 * 1000);
    },
  });

  middleware.startListening({
    matcher: authApi.endpoints.logout.matchPending,
    effect: () => {
      clearTimeout(refreshTimeout);
      clearTimeout(initialRefreshTimeout);
    },
  });
}
