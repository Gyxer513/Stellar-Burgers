/* cSpell:disable; */
import { api } from "../../utils/Api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setCookie } from "../../utils/cookie";

/* ***** Регистрация нового пользователя ***** */

export const registerNewUser = createAsyncThunk(
  "registerUser",
  async (data) => {
    return api.newUser(data).catch((error) => {
      console.warn(error);
    });
  }
);

/* ***** Авторизация существующего пользователя ***** */

export const loginUser = createAsyncThunk("loginUser", async (data) => {
  return api.loginUser(data).catch((error) => {
    console.warn(error);
  });
});

/* ***** Восстановление пароля ***** */

export const fogotPass = createAsyncThunk("fogotPass", async (data) => {
  return api.fogotPassword(data).catch((error) => {
    console.warn(error);
  });
});

/* ***** Выход из системы ***** */

export const logout = createAsyncThunk("logout", async (data) => {
  return api.logout(data).catch((error) => {
    console.warn(error);
  });
});

/* ***** Обновление данных пользователя ***** */

export const updateUserData = createAsyncThunk(
  "updateUser",
  async (token, data) => {
    return api.updateUserData(token, data).catch((error) => {
      console.warn(error);
    });
  }
);

/* ***** Обновление пароля ***** */
export const updatePass = createAsyncThunk(
  "updatePass",
  async (data) => {
    return api.updatePass(data).catch((error) => {
      console.warn(error);
    });
  }
);

/* ***** Проверка авторизации ***** */
export const checkAuth = createAsyncThunk(
  "checkAuth",
  async (data) => {
    return api.checkAuth(data).catch((error) => {
      console.warn(error);
    });
  }
);

const authorizationReducer = createSlice({
  name: "authorizationReducer",
  initialState: {
    isLoading: false,
    isAuthorizationSucsess: false,
    userData: null,
    accessToken: null,
    error: null,
    resetStatus: null,
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
      setCookie('accessToken', action.payload.accessToken.split('Bearer ')[1]);
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
      state.resetStatus = true;
    },

    [fogotPass.rejected]: (state) => {
      state.isLoading = false;
      state.isAuthorizationSucsess = false;
      state.resetStatus = false;
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

    [updatePass.pending]: (state) => {
      state.isLoading = true;
      state.isAuthorizationSucsess = false;
    },
    [updatePass.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [updatePass.rejected]: (state) => {
      state.isAuthorizationSucsess = false;
    },

    [checkAuth.pending]: (state) => {
      state.isLoading = true;
      state.isAuthorizationSucsess = false;
    },
    [checkAuth.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isAuthorizationSucsess = true;
      state.userData = action.payload.user;
    },
    [checkAuth.rejected]: (state) => {
      state.isAuthorizationSucsess = false;
    },
  },
});

export default authorizationReducer.reducer;
