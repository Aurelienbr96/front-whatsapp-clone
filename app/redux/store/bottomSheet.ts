import {createSlice} from '@reduxjs/toolkit';

export interface BottomSheetState {
  isOpen: boolean;
}

const initialState: BottomSheetState = {
  isOpen: false,
};

export const bottomSheetSlice = createSlice({
  name: 'bottomSheet',
  initialState,
  reducers: {
    open: state => {
      console.log('here');
      state.isOpen = true;
    },
    close: state => {
      state.isOpen = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {open, close} = bottomSheetSlice.actions;

export default bottomSheetSlice.reducer;
