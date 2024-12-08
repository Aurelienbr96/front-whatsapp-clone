import {loginListener} from '../api/auth/auth.listener';
import {listenerMiddleware} from './store';

export const listeners: Array<(middleware: typeof listenerMiddleware) => void> =
  [loginListener];
