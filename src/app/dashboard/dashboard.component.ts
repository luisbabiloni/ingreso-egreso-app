import { Component, OnInit } from "@angular/core";
import { IngresoGastoService } from "../ingreso-egreso/ingreso-gasto.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styles: []
})
export class DashboardComponent implements OnInit {
  constructor(public ingresoGastoService: IngresoGastoService) {}

  ngOnInit() {
    this.ingresoGastoService.initIngresoGastoListener();
  }
}
