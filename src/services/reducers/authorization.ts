/* cSpell:disable; */
import { api } from "../../utils/Api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setCookie, deleteCookie } from "../../utils/cookie";
import { IauthorizationStore } from "../types/store";

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
export const checkAuth = createAsyncThunk("checkAuth", async (data) =>
  api.checkAuth(data)
);

/* ***** Обновление токена ***** */
export const refreshToken = createAsyncThunk("refreshToken", async () =>
  api.refreshToken()
);

const initialState: IauthorizationStore = {
  isLoading: false,
  isAuthorizationSuccess: false,
  userData: null,
  accessToken: null,
  error: null,
  resetStatus: null,
  tokenError: false,
};
const authorizationReducer = createSlice({
  name: "authorizationReducer",
  initialState,

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerNewUser.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(registerNewUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthorizationSuccess = true;
        state.userData = action.payload.user;
        localStorage.setItem("refreshToken", action.payload.refreshToken);
        state.accessToken = action.payload.accessToken;
      }),
      builder.addCase(registerNewUser.rejected, (state, action) => {
        state.isAuthorizationSuccess = false;
        console.warn(action.error);
      }),
      builder.addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      }),
      builder.addCase(
        loginUser.fulfilled,
        (state: IauthorizationStore, action) => {
          state.isLoading = false;
          state.isAuthorizationSuccess = true;
          state.userData = action.payload.user;
          localStorage.setItem("refreshToken", action.payload.refreshToken);
          setCookie(
            "accessToken",
            action.payload.accessToken.split("Bearer ")[1]
          );
          state.accessToken = action.payload.accessToken;
        }
      ),
      builder.addCase(loginUser.rejected, (state, action: any) => {
        state.isAuthorizationSuccess = false;
        console.warn(action.error);
      }),
      builder.addCase(fogotPass.pending, (state) => {
        state.isLoading = true;
      }),
      builder.addCase(fogotPass.fulfilled, (state) => {
        state.isLoading = false;
        state.resetStatus = true;
      }),
      builder.addCase(fogotPass.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthorizationSuccess = false;
        state.resetStatus = false;
        console.warn(action.error);
      }),
      builder.addCase(logout.pending, (state) => {
        state.isLoading = true;
      }),
      builder.addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        localStorage.setItem("refreshToken", "");
        state.isAuthorizationSuccess = false;
        state.userData = null;
        deleteCookie("accessToken");
      }),
      builder.addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthorizationSuccess = false;
        console.warn(action.error);
      }),
      builder.addCase(updateUserData.pending, (state) => {
        state.isLoading = true;
      }),
      builder.addCase(updateUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthorizationSuccess = true;
      }),
      builder.addCase(updateUserData.rejected, (state, action) => {
        state.isAuthorizationSuccess = false;
        console.warn(action.error);
      }),
      builder.addCase(updatePass.pending, (state) => {
        state.isLoading = true;
        state.isAuthorizationSuccess = false;
      }),
      builder.addCase(updatePass.fulfilled, (state) => {
        state.isLoading = false;
      }),
      builder.addCase(updatePass.rejected, (state, action) => {
        state.isAuthorizationSuccess = false;
        console.warn(action.error);
        console.warn(action.error);
      }),
      builder.addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
        state.isAuthorizationSuccess = false;
      }),
      builder.addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthorizationSuccess = action.payload?.success;
        state.userData = action.payload?.user;
        state.tokenError = false;
      }),
      builder.addCase(checkAuth.rejected, (state, action) => {
        state.isAuthorizationSuccess = false;
        state.tokenError = true;
        console.warn(action.error);
      }),
      builder.addCase(refreshToken.pending, (state) => {
        state.isLoading = true;
        state.isAuthorizationSuccess = false;
      }),
      builder.addCase(refreshToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthorizationSuccess = true;
        setCookie(
          "accessToken",
          action.payload.accessToken.split("Bearer ")[1]
        );
        localStorage.setItem("refreshToken", action.payload.refreshToken);
      }),
      builder.addCase(refreshToken.rejected, (state, action) => {
        state.isAuthorizationSuccess = false;
        console.warn(action.error);
      });
  },
});

export default authorizationReducer.reducer;
