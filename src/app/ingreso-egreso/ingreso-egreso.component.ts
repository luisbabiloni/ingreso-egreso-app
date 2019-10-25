import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";

import { IngresoEgreso } from "./ingreso-egreso.model";
import { IngresoGastoService } from "./ingreso-gasto.service";
import { ToastService } from "../shared/toast/toast.service";
import { AppState } from "../app.state";
import { activarLoading, desactivarLoading } from "../shared/ui.actions";

@Component({
  selector: "app-ingreso-egreso",
  templateUrl: "./ingreso-egreso.component.html",
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  forma: FormGroup;
  tipo = "ingreso";

  loadingSubs: Subscription = new Subscription();
  cargando: boolean;

  constructor(
    public ingresoGastoService: IngresoGastoService,
    private toastService: ToastService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.loadingSubs = this.store
      .select("ui")
      .subscribe(ui => (this.cargando = ui.estaCargando));

    this.forma = new FormGroup({
      concepto: new FormControl("", Validators.required),
      importe: new FormControl(0, Validators.min(0))
    });
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }

  crearIngresoGasto() {
    this.store.dispatch(activarLoading());
    const ingresoGasto = new IngresoEgreso({
      ...this.forma.value,
      tipo: this.tipo
    });
    this.ingresoGastoService
      .crearIngresoGasto(ingresoGasto)
      .then(() => {
        this.forma.reset({
          importe: 0
        });
        this.toastService.exito(
          `ÉXITO: el ${ingresoGasto.tipo} "${ingresoGasto.concepto}" creado correctamente.`
        );
        setTimeout(() => {
          this.store.dispatch(desactivarLoading());
        }, 2000);
        console.log(ingresoGasto);
      })
      .catch(err => {
        console.log(err);
      });
  }
}
