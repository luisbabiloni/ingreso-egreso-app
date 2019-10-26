import * as IngresoGastoActions from "./ingreso-gasto.actions";
import { IngresoEgreso } from "./ingreso-egreso.model";
import { createReducer, on, Action } from "@ngrx/store";
import { AppState } from "../app.state";

export interface IngresoGastoState {
  items: IngresoEgreso[];
}

export interface AppState extends AppState {
  ingresoGasto: IngresoEgreso;
}

const estadoInicial: IngresoGastoState = {
  items: []
};

const ingresoGasto = createReducer(
  estadoInicial,
  on(IngresoGastoActions.setItems, (state, action) => ({
    ...state,
    items: [
      ...action.items.map(item => {
        return {
          ...item
        };
      })
    ]
  })),
  on(IngresoGastoActions.unsetItems, state => ({
    ...state,
    items: []
  }))
);

export function ingresoGastoReducer(
  state: IngresoGastoState | undefined,
  action: Action
) {
  return ingresoGasto(state, action);
}
