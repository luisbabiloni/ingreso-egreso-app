import { ActionReducerMap } from "@ngrx/store";

import * as UiReducer from "../app/shared/ui.reducer";
import * as AuthReducer from "../app/auth/auth.reducer";

export interface AppState {
  ui: UiReducer.State;
  auth: AuthReducer.AuthState;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: UiReducer.reducer,
  auth: AuthReducer.reducer
};
