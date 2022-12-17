/* cSpell:disable */
import { BASE_URL } from "./data";

class Api {
  constructor(link) {
    this._link = link;
  }
  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }
  getData() {
    return fetch(`${this._link}/ingredients`).then((res) =>
      this._checkResponse(res)
    );
  }
  sendData(orderList) {
    return fetch(`${this._link}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients: orderList }),
    }).then((res) => this._checkResponse(res));
  }

  /*   Запросы авторизации спринт 9 роутинг и авторизация */

  /* Регистрация пользователя */
  newUser(data) {
    return fetch(`${this._link}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => this._checkResponse(res));
  }

  /* Вход по логину паролю */

  loginUser(data) {
    return fetch(`${this._link}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => this._checkResponse(res));
  }

  /* Восстановление пароля  */
  fogotPassword(data) {
    return fetch(`${this._link}/password-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => this._checkResponse(res));
  }
  logout(data) {
    return fetch(`${this._link}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => this._checkResponse(res));
  }

 updateUserData(token, data) {
    return fetch(`${this._link}/auth/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": token
      },
      body: JSON.stringify(data),
    }).then((res) => this._checkResponse(res));
  }
}
export const api = new Api(BASE_URL);
