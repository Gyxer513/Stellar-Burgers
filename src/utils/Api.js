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
  newUser(email, name, password) {
    return fetch(`${this._link}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    }).then((res) => this._checkResponse(res));
  }
}

export const api = new Api(BASE_URL);