import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface AuthType {
  countryCode: string | null;
  languageCode: string | null;
  deviceId: string | null;
  refreshToken: string | null;
  accessToken: string | null;
}

const initialState: AuthType = {
  countryCode: null,
  languageCode: null,
  deviceId: null,
  refreshToken: null,
  accessToken: null,
};

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    ADD_AUTH: (state, action: PayloadAction<AuthType>) => {
      state.countryCode = action.payload.countryCode;
      state.languageCode = action.payload.languageCode;
      state.deviceId = action.payload.deviceId;
      state.refreshToken = action.payload.refreshToken;
      state.accessToken = action.payload.accessToken;
    },
    REMOVE_AUTH: state => {
      state.countryCode = null;
      state.languageCode = null;
      state.deviceId = null;
      state.accessToken = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {ADD_AUTH, REMOVE_AUTH} = authSlice.actions;

export default authSlice.reducer;
