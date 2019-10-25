import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { filter } from "rxjs/operators";
import { AuthService } from "src/app/auth/auth.service";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.state";
import { User } from "src/app/auth/user.model";
import { IngresoGastoService } from "src/app/ingreso-egreso/ingreso-gasto.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {
  user: User;
  subscription: Subscription = new Subscription();

  constructor(
    public authService: AuthService,
    public ingresoGastoService: IngresoGastoService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.subscription = this.store
      .select("auth")
      .pipe(filter(auth => auth.user != null))
      .subscribe(auth => {
        this.user = auth.user;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  cerrarSesion() {
    this.authService.logout();
    this.ingresoGastoService.cancelarSubscriptions();
  }
}
