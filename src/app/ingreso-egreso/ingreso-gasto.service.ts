import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Store } from "@ngrx/store";

import { IngresoEgreso } from "./ingreso-egreso.model";
import { AuthService } from "../auth/auth.service";
import { User } from "../auth/user.model";
import { AppState } from "../app.state";
import { filter } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class IngresoGastoService {
  items: [];

  constructor(
    private afs: AngularFirestore,
    public authService: AuthService,
    private store: Store<AppState>
  ) {}

  initIngresoGastoListener() {
    this.store
      .select("auth")
      .pipe(filter(auth => auth.user != null))
      .subscribe(auth => {
        console.log(auth.user.uid);
        this.ingresoGastoItems(auth.user.uid);
      });
  }

  private ingresoGastoItems(uid: string) {
    this.afs
      .collection(`${uid}`)
      .doc("ingresos-gastos")
      .collection("items")
      .valueChanges()
      .subscribe(docData => {
        console.log(docData);
      });
  }

  crearIngresoGasto(ingresoGasto: IngresoEgreso) {
    const user: User = this.authService.getUsuario();
    return this.afs
      .doc(`${user.uid}/ingresos-gastos`)
      .collection("items")
      .add({ ...ingresoGasto });
  }
}
