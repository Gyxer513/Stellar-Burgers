/* cSpell:disable; */
import { api } from "../../utils/Api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setCookie, deleteCookie } from "../../utils/cookie";

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
  async (data) => {
    return api.updateUserData(data).catch((error) => {
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
      if (error.message === "jwt expired") {
      refreshToken(localStorage.getItem('refreshToken'))
      }
      console.warn(error);
  });
  }
);

/* ***** Обновление токена ***** */
export const refreshToken = createAsyncThunk(
  "refreshToken",
  async () => {
    return api.refreshToken().catch((error) => {
      console.warn(error);
    });
  }
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
    error: null,
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

    [registerNewUser.rejected]: (state) => {
      state.isAuthorizationSuccess = false;
    },
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isAuthorizationSuccess = true;
      state.userData = action.payload.user;
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      setCookie('accessToken', action.payload.accessToken.split('Bearer ')[1]);
      state.accessToken = action.payload.accessToken;
    },
    [loginUser.rejected]: (state) => {
      state.isAuthorizationSuccess = false;
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
      state.isAuthorizationSuccess = false;
      state.resetStatus = false;
    },

    [logout.pending]: (state) => {
      state.isLoading = true;
    },
    [logout.fulfilled]: (state) => {
      state.isLoading = false;
      localStorage.setItem("refreshToken", null);
      state.isAuthorizationSuccess = false;
      state.userData = null;
      deleteCookie('accessToken');
    },
    [logout.rejected]: (state) => {
      state.isLoading = false;
      state.isAuthorizationSuccess = false;
    },

    [updateUserData.pending]: (state) => {
      state.isLoading = true;
    },
    [updateUserData.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isAuthorizationSuccess = true;
    },
    [updateUserData.rejected]: (state) => {
      state.isAuthorizationSuccess = false;
    },

    [updatePass.pending]: (state) => {
      state.isLoading = true;
      state.isAuthorizationSuccess = false;
    },
    [updatePass.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [updatePass.rejected]: (state) => {
      state.isAuthorizationSuccess = false;
    },

    [checkAuth.pending]: (state) => {
      state.isLoading = true;
      state.isAuthorizationSuccess = false;
    },
    [checkAuth.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isAuthorizationSuccess = true;
      state.userData = action.payload.user;
    },
    [checkAuth.rejected]: (state) => {
      state.isAuthorizationSuccess = false;
    },

    [refreshToken.pending]: (state) => {
      state.isLoading = true;
      state.isAuthorizationSuccess = false;
    },
    [refreshToken.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isAuthorizationSuccess = true;
      setCookie('accessToken', action.payload.accessToken.split('Bearer ')[1]);
    },
    [refreshToken.rejected]: (state) => {
      state.isAuthorizationSuccess = false;
    },
  },
});

export default authorizationReducer.reducer;
