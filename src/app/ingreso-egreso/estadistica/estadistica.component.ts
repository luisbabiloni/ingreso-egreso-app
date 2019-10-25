import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";

import { AppState } from "src/app/app.state";
import { IngresoEgreso } from "../ingreso-egreso.model";

@Component({
  selector: "app-estadistica",
  templateUrl: "./estadistica.component.html",
  styles: []
})
export class EstadisticaComponent implements OnInit {
  ingresos: number;
  gastos: number;

  cuantosIngresos: number;
  cuantosGastos: number;

  private subscription: Subscription = new Subscription();

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.subscription = this.store
      .select("ingresoGasto")
      .subscribe(ingresoGasto => this.contarIngresosGastos(ingresoGasto.items));
  }

  contarIngresosGastos(items: IngresoEgreso[]) {
    this.ingresos = 0;
    this.gastos = 0;
    this.cuantosIngresos = 0;
    this.cuantosGastos = 0;

    items.forEach(item => {
      if (item.tipo === "ingreso") {
        this.cuantosIngresos++;
        this.ingresos = item.importe;
      } else {
        this.cuantosGastos++;
        this.gastos = item.importe;
      }
    });
  }
}
