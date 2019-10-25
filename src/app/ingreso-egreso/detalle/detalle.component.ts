import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";

import { AppState } from "src/app/app.state";
import { IngresoEgreso } from "../ingreso-egreso.model";
import { IngresoGastoService } from "../ingreso-gasto.service";
import { ToastService } from "src/app/shared/toast/toast.service";

@Component({
  selector: "app-detalle",
  templateUrl: "./detalle.component.html",
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {
  items: IngresoEgreso[];
  private subscription: Subscription = new Subscription();

  constructor(
    private store: Store<AppState>,
    public ingresoGastoService: IngresoGastoService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.subscription = this.store
      .select("ingresoGasto")
      .subscribe(ingresoGasto => {
        this.items = ingresoGasto.items;
        // console.log(ingresoGasto.items);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  borrarItem(item: IngresoEgreso) {
    console.log(item.uid);
    this.ingresoGastoService
      .borrarIngresoGasto(item.uid)
      .then(() => {
        this.toastService.exito(
          `ÉXITO: el item ${item.concepto} borrado de la base de datos`
        );
      })
      .catch(err => {
        console.log(err);
      });
  }
}
