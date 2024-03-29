/* cSpell:disable */
import { BASE_URL } from "./data";
import { getCookie } from "./cookie";
import { IuserData } from "../services/types/user";

class Api {
  private _link: string;
  constructor(link: string) {
    this._link = link;
  }
  _checkResponse(res: Response) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }
  getData() {
    return fetch(`${this._link}/ingredients`).then((res) =>
      this._checkResponse(res)
    );
  }
  sendData(orderList: object | void) {
    return fetch(`${this._link}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("accessToken"),
      },
      body: JSON.stringify({ ingredients: orderList }),
    }).then((res) => this._checkResponse(res));
  }

  /*   Запросы авторизации спринт 9 роутинг и авторизация */

  /* Регистрация пользователя */
  newUser(data: IuserData) {
    return fetch(`${this._link}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => this._checkResponse(res));
  }

  /* Вход по логину паролю */

  loginUser(data: object | void) {
    return fetch(`${this._link}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => this._checkResponse(res));
  }

  /* Восстановление пароля  */

  fogotPassword(data: object | void) {
    return fetch(`${this._link}/password-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => this._checkResponse(res));
  }

  /* Выход */
  logout(data: object | void) {
    return fetch(`${this._link}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => this._checkResponse(res));
  }
  /* Обновление данных пользователя */

  updateUserData(data: object | void) {
    return fetch(`${this._link}/auth/user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: "Bearer " + getCookie("accessToken"),
      },
      body: JSON.stringify(data),
    }).then((res) => this._checkResponse(res));
  }

  /* Обновление пароля */
  updatePass(data: object | void) {
    return fetch(`${this._link}/password-reset/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => this._checkResponse(res));
  }

  /* Проверка авторизации */
  checkAuth(data: object | void) {
    return fetch(`${this._link}/auth/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("accessToken"),
      },
      body: JSON.stringify(data),
    }).then((res) => this._checkResponse(res));
  }

  /* Обновление токена */
  refreshToken() {
    return fetch(`${this._link}/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
    }).then((res) => this._checkResponse(res));
  }
  /* Запрос на двнные заказа */
  getFullOrderInfo(order_number: number | string) {
    return fetch(`${this._link}/orders/${order_number}`).then((res) =>
      this._checkResponse(res)
    );
  }
}

export const api = new Api(BASE_URL);
