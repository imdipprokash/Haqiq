import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface AuthType {
  content: any[];
  showSplashScr: boolean;
}

const initialState: AuthType = {
  content: [],
  showSplashScr: true,
};

export const contentSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    Set_Content: (state, action: PayloadAction<AuthType>) => {
      state.content = action.payload.content;
      state.showSplashScr = action.payload.showSplashScr;
    },
    Remove_Content: state => {
      state.content = [];
      state.showSplashScr = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {Set_Content, Remove_Content} = contentSlice.actions;

export default contentSlice.reducer;
