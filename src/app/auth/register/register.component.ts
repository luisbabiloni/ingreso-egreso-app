import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "../auth.service";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";

import { AppState } from "src/app/app.state";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {
  cargando: boolean;
  subscription: Subscription = new Subscription();

  constructor(public authService: AuthService, public store: Store<AppState>) {}

  ngOnInit() {
    this.store.select("ui").subscribe(ui => (this.cargando = ui.estaCargando));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit(data: any) {
    // console.log("data: ", data);
    this.authService.crearUsuario(data.nombre, data.email, data.password);
  }
}
