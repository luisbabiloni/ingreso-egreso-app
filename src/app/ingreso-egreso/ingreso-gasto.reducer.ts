import * as IngresoGastoActions from "./ingreso-gasto.actions";
import { IngresoEgreso } from "./ingreso-egreso.model";
import { createReducer, on, Action } from "@ngrx/store";

export interface IngresoGastoState {
  items: IngresoEgreso[];
}

const estadoInicial: IngresoGastoState = {
  items: []
};

const ingresoGastoReducer = createReducer(
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

export function reducer(state: IngresoGastoState | undefined, action: Action) {
  return ingresoGastoReducer(state, action);
}
