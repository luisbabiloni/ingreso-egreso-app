import * as UiActions from "./ui.actions";
import { createReducer, on, Action } from "@ngrx/store";

export interface State {
  estaCargando: boolean;
}

const estadoInicial: State = {
  estaCargando: false
};

const uiReducer = createReducer(
  estadoInicial,
  on(UiActions.activarLoading, state => ({ ...state, estaCargando: true })),
  on(UiActions.desactivarLoading, state => ({ ...state, estaCargando: false }))
);

export function reducer(state: State | undefined, action: Action) {
  return uiReducer(state, action);
}
