import { ActionReducerMap } from "@ngrx/store";

import * as UiReducer from "../app/shared/ui.reducer";
import * as AuthReducer from "../app/auth/auth.reducer";
import * as IngresoGastoReducer from "../app/ingreso-egreso/ingreso-gasto.reducer";

export interface AppState {
  ui: UiReducer.State;
  auth: AuthReducer.AuthState;
  ingresoGasto: IngresoGastoReducer.IngresoGastoState;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: UiReducer.reducer,
  auth: AuthReducer.reducer,
  ingresoGasto: IngresoGastoReducer.reducer
};
