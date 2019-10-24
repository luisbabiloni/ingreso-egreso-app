import { createAction } from "@ngrx/store";

export const activarLoading = createAction("[UI Loading] Cargando...");
export const desactivarLoading = createAction("[UI Loading] Fin de carga.");
