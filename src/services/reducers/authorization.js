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

/* ***** Авторизация существующего пользователя ***** */

export const loginUser = createAsyncThunk("loginUser", async (data) => {
  const res = api.loginUser(data);
  return res;
});

/* ***** Восстановление пароля ***** */
export const fogotPass = createAsyncThunk("fogotPass", async (data) => {
  const res = api.fogotPassword(data);
  return res;
});

/* ***** Выход из системы ***** */

export const logout = createAsyncThunk("logout", async (data) => {
  const res = api.logout(data);
  return res;
});

export const updateUserData = createAsyncThunk("logout", async (token, data) => {
  const res = api.updateUserData(token, data);
  return res;
});


const authorizationReducer = createSlice({
  name: "authorizationReducer",
  initialState: {
    isLoading: false,
    isAuthorizationSucsess: false,
    userData: null,
    accessToken: null,
    error: null,
  },

  reducers: {},
  extraReducers: {
    [registerNewUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerNewUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isAuthorizationSucsess = true;
      state.userData = action.payload.user;
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      state.accessToken = action.payload.accessToken;
    },

    [registerNewUser.rejected]: (state) => {
      state.isAuthorizationSucsess = false;
    },
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isAuthorizationSucsess = true;
      state.userData = action.payload.user;
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      state.accessToken = action.payload.accessToken;
    },
    [loginUser.rejected]: (state) => {
      state.isAuthorizationSucsess = false;
    },

    [fogotPass.pending]: (state) => {
      state.isLoading = true;
    },
    [fogotPass.fulfilled]: (state) => {
      state.isLoading = false;
    },

    [fogotPass.rejected]: (state) => {
      state.isLoading = false;
      state.isAuthorizationSucsess = false;
    },

    [logout.pending]: (state) => {
      state.isLoading = true;
    },
    [logout.fulfilled]: (state) => {
      state.isLoading = false;
      localStorage.setItem("refreshToken", null);
      state.isAuthorizationSucsess = false;
      state.userData = null;
    },
    [logout.rejected]: (state) => {
      state.isLoading = false;
      state.isAuthorizationSucsess = false;
    },

    [updateUserData.pending]: (state) => {
      state.isLoading = true;
    },
    [updateUserData.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isAuthorizationSucsess = true;
      state.userData = action.payload.user;
    },
    [updateUserData.rejected]: (state) => {
      state.isAuthorizationSucsess = false;
    },
  },
});

export default authorizationReducer.reducer;
