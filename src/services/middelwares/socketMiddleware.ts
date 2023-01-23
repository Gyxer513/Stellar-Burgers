
import { IWsActions } from "../types/wsActions";
import type {Middleware, MiddlewareAPI} from 'redux';
import { AppDispatch, useAppSelector } from "../store"; 

export const socketMiddleware = (wsActions: IWsActions) => {
  return (store) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { type, payload } = action;
      const { dispatch } = store;
      const { wsConnection, wsOffline, wsOpen, wsError, wsMessage, wsClose } =
        wsActions;

      if (type === wsConnection) {
        socket = new WebSocket(payload);
      }

      if (type === wsOffline) {
        socket = null;
      }

      if (socket) {
        socket.onopen = () => {
          dispatch({ type: wsOpen, payload: true });
        };
        socket.onerror = (event) => {
          dispatch({ type: wsError, payload: event });
        };
        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch({ type: wsMessage, payload: parsedData });
        };
        socket.onclose = (event) => {
          dispatch({ type: wsClose, payload: event.code.toString() });
        };
      }

      next(action);
    };
  };
};
