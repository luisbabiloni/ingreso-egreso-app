import { Component, OnInit } from "@angular/core";
import { CurrencyPipe } from "@angular/common";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";

import * as ingresoGastoReducer from "../ingreso-gasto.reducer";
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

  subscription: Subscription = new Subscription();

  /** Ngxs-Charts */
  single: any[];
  view: any[] = [700, 400];
  colorScheme = {
    domain: ["#5AA454", "#A10A28"]
  };

  constructor(
    private store: Store<ingresoGastoReducer.AppState>,
    private currencyPipe: CurrencyPipe
  ) {}

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

    const single = [
      {
        name: "Ingresos",
        value: this.ingresos
      },
      {
        name: "Gastos",
        value: this.gastos
      }
    ];

    this.formatEuros(this.ingresos);
    Object.assign(this, { single });
  }

  onSelect(event: any) {
    console.log(event);
  }

  formatEuros(val: number) {
    this.currencyPipe.transform(val, "EUR", true, "1.1-2", "es");
  }
}
