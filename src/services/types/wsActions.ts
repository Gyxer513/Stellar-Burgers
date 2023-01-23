/* cSpell:disable; */
import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
} from "@reduxjs/toolkit";

export interface IWsActions {
  wsConnection: ActionCreatorWithoutPayload<string>;
  wsOffline: ActionCreatorWithoutPayload<string>;
  wsOpen: ActionCreatorWithPayload<string>;
  wsError: ActionCreatorWithoutPayload<string>;
  wsClose: ActionCreatorWithPayload<string>;
  wsMessage: ActionCreatorWithPayload<string>;
}
