import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { StoreModule } from "@ngrx/store";
import { ingresoGastoReducer } from "./ingreso-gasto.reducer";

/** Ngx-Charts */
import { NgxChartsModule } from "@swimlane/ngx-charts";

import { SharedModule } from "../shared/shared.module";
import { DashboardRoutingModule } from "../dashboard/dashboard-routing.module";

import { DashboardComponent } from "../dashboard/dashboard.component";
import { IngresoEgresoComponent } from "./ingreso-egreso.component";
import { EstadisticaComponent } from "./estadistica/estadistica.component";
import { DetalleComponent } from "./detalle/detalle.component";
import { OrdenIngresoGastoPipe } from "./orden-ingreso-gasto.pipe";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    DashboardRoutingModule,

    StoreModule.forFeature("ingresoGasto", ingresoGastoReducer),

    /** Ngx-Charts */
    NgxChartsModule
  ],
  declarations: [
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    OrdenIngresoGastoPipe
  ]
})
export class IngresoEgresoModule {}
