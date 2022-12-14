/* cSpell:disable; */
import { api } from "../../utils/Api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/* ***** Регистрация нового пользователя ***** */

export const registerNewUser = createAsyncThunk(
  "registerUser",
  async (data) => {
    const res = api.newUser(data);
    return res;
  }
);

const authorizationReducer = createSlice({
  name: "authorizationReducer",
  initialState: {
    isLoading: false,
    isAuthorizationSucsess: false,
    userData: null,
    accessToken: null,
  },
  reducers: {},
  extraReducers: {
    [registerNewUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerNewUser.fulfilled]: (state, action) => {
      state.isLoading = true;
      state.isAuthorizationSucsess = true;
      state.userData = action.payload.user;
      localStorage.setItem("refreshToken", action.refreshToken);
      state.accessToken = action.payload.accessToken;
    },
    [registerNewUser.rejected]: (state) => {
      state.isAuthorizationSucsess = false;
    },
  },
});

export default authorizationReducer.reducer;
