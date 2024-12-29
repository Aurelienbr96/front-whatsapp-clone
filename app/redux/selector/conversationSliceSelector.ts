import {createSelector} from '@reduxjs/toolkit';

import {RootState} from '../store';

export const selectConversationState = createSelector(
  (state: RootState) => state,
  state => state.conversation,
);
