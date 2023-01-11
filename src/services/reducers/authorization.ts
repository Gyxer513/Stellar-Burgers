/* cSpell:disable; */
import { api } from "../../utils/Api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setCookie, deleteCookie } from "../../utils/cookie";


/* ***** Регистрация нового пользователя ***** */

export const registerNewUser = createAsyncThunk("registerUser", async (data) =>
  api.newUser(data)
);

/* ***** Авторизация существующего пользователя ***** */

export const loginUser = createAsyncThunk("loginUser", async (data) => {
  return api.loginUser(data);
});

/* ***** Восстановление пароля ***** */

export const fogotPass = createAsyncThunk("fogotPass", async (data) => {
  return api.fogotPassword(data);
});

/* ***** Выход из системы ***** */

export const logout = createAsyncThunk("logout", async (data) =>
  api.logout(data)
);

/* ***** Обновление данных пользователя ***** */

export const updateUserData = createAsyncThunk("updateUser", async (data) =>
  api.updateUserData(data)
);

/* ***** Обновление пароля ***** */
export const updatePass = createAsyncThunk("updatePass", async (data: any) =>
  api.updatePass(data)
);

/* ***** Проверка авторизации ***** */
export const checkAuth = createAsyncThunk("checkAuth", async () =>
  api.checkAuth()
);

/* ***** Обновление токена ***** */
export const refreshToken = createAsyncThunk("refreshToken", async () =>
  api.refreshToken()
);

const authorizationReducer = createSlice({
  name: "authorizationReducer",
  initialState: {
    isLoading: false,
    isAuthorizationSuccess: false,
    userData: null,
    accessToken: null,
    error: null,
    resetStatus: null,
    tokenError: false,
  },

  reducers: {},
  extraReducers: {
    [registerNewUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerNewUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isAuthorizationSuccess = true;
      state.userData = action.payload.user;
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      state.accessToken = action.payload.accessToken;
    },

    [registerNewUser.rejected]: (state, action) => {
      state.isAuthorizationSuccess = false;
      console.warn(action.error);
    },
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isAuthorizationSuccess = true;
      state.userData = action.payload.user;
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      setCookie("accessToken", action.payload.accessToken.split("Bearer ")[1]);
      state.accessToken = action.payload.accessToken;
    },
    [loginUser.rejected]: (state, action) => {
      state.isAuthorizationSuccess = false;
      console.warn(action.error);
    },

    [fogotPass.pending]: (state) => {
      state.isLoading = true;
    },
    [fogotPass.fulfilled]: (state) => {
      state.isLoading = false;
      state.resetStatus = true;
    },

    [fogotPass.rejected]: (state, action) => {
      state.isLoading = false;
      state.isAuthorizationSuccess = false;
      state.resetStatus = false;
      console.warn(action.error);
    },

    [logout.pending]: (state) => {
      state.isLoading = true;
    },
    [logout.fulfilled]: (state) => {
      state.isLoading = false;
      localStorage.setItem("refreshToken", null);
      state.isAuthorizationSuccess = false;
      state.userData = null;
      deleteCookie("accessToken");
    },
    [logout.rejected]: (state, action) => {
      state.isLoading = false;
      state.isAuthorizationSuccess = false;
      console.warn(action.error);
    },

    [updateUserData.pending]: (state) => {
      state.isLoading = true;
    },
    [updateUserData.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isAuthorizationSuccess = true;
    },
    [updateUserData.rejected]: (state, action) => {
      state.isAuthorizationSuccess = false;
      console.warn(action.error);
    },

    [updatePass.pending]: (state) => {
      state.isLoading = true;
      state.isAuthorizationSuccess = false;
    },
    [updatePass.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [updatePass.rejected]: (state, action) => {
      state.isAuthorizationSuccess = false;
      console.warn(action.error);
      console.warn(action.error);
    },

    [checkAuth.pending]: (state) => {
      state.isLoading = true;
      state.isAuthorizationSuccess = false;
    },
    [checkAuth.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isAuthorizationSuccess = action.payload?.success;
      state.userData = action.payload?.user;
      state.tokenError = false;
    },
    [checkAuth.rejected]: (state, action) => {
      state.isAuthorizationSuccess = false;
      state.tokenError = true;
      console.warn(action.error);
    },

    [refreshToken.pending]: (state) => {
      state.isLoading = true;
      state.isAuthorizationSuccess = false;
    },
    [refreshToken.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isAuthorizationSuccess = true;
      setCookie("accessToken", action.payload.accessToken.split("Bearer ")[1]);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
    },
    [refreshToken.rejected]: (state, action) => {
      state.isAuthorizationSuccess = false;
      console.warn(action.error);
    },
  },
});

export default authorizationReducer.reducer;
