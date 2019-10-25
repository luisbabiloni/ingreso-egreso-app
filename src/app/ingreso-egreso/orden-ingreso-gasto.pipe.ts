import { Pipe, PipeTransform } from "@angular/core";
import { IngresoEgreso } from "./ingreso-egreso.model";

@Pipe({
  name: "ordenIngresoGasto"
})
export class OrdenIngresoGastoPipe implements PipeTransform {
  transform(items: IngresoEgreso[]): IngresoEgreso[] {
    return items.sort((a, b) => {
      if (a.tipo === "ingreso") {
        return -1;
      } else {
        return 1;
      }
    });
  }
}
