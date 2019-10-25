import { createAction, props } from "@ngrx/store";
import { IngresoEgreso } from "./ingreso-egreso.model";

export const setItems = createAction(
  "[Ingreso Gasto] Set items",
  props<{ items: IngresoEgreso[] }>()
);
export const unsetItems = createAction("[Ingreso Gasto] Unset items");
