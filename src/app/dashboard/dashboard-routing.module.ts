import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";

import { SharedModule } from "../shared/shared.module";

import { DashboardComponent } from "./dashboard.component";
import { dashboardRoutes } from "./dashboard.routes";
import { AuthGuardService } from "../auth/auth-guard.service";

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    children: dashboardRoutes
    // canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
