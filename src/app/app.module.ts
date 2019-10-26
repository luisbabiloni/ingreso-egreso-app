import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

// ngrx
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { appReducers } from "./app.state";

// firebase
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";

import { environment } from "../environments/environment";

// modules
import { SharedModule } from "./shared/shared.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { IngresoEgresoComponent } from "./ingreso-egreso/ingreso-egreso.component";
import { EstadisticaComponent } from "./ingreso-egreso/estadistica/estadistica.component";
import { DetalleComponent } from "./ingreso-egreso/detalle/detalle.component";
import { OrdenIngresoGastoPipe } from "./ingreso-egreso/orden-ingreso-gasto.pipe";

import { AuthModule } from "./auth/auth.module";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";

import { IngresoEgresoModule } from "./ingreso-egreso/ingreso-egreso.module";
import { DashboardRoutingModule } from "./dashboard/dashboard-routing.module";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,

    // ngrx
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production // Restrict extension to log-only mode
    }),

    /** firebase */
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,

    SharedModule,
    AuthModule

    // DashboardRoutingModule
  ],
  declarations: [AppComponent, LoginComponent, RegisterComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
