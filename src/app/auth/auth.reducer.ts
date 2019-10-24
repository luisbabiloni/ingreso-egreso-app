import * as AuthActions from "./auth.actions";
import { User } from "./user.model";
import { createReducer, on, Action } from "@ngrx/store";

export interface AuthState {
  estaAutenticado: boolean;
  user: User;
}

const estadoInicial: AuthState = {
  estaAutenticado: false,
  user: null
};

const authReducer = createReducer(
  estadoInicial,
  on(AuthActions.setUser, (state, { user }) => ({
    ...state,
    estaAutenticado: true,
    user: { ...user }
  }))
);

export function reducer(state: AuthState | undefined, action: Action) {
  return authReducer(state, action);
}
