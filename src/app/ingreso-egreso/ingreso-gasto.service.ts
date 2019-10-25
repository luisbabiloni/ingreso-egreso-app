import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";

import { IngresoEgreso } from "./ingreso-egreso.model";
import { AuthService } from "../auth/auth.service";
import { User } from "../auth/user.model";
import { AppState } from "../app.state";
import { filter, map } from "rxjs/operators";
import { setItems, unsetItems } from "./ingreso-gasto.actions";

@Injectable({
  providedIn: "root"
})
export class IngresoGastoService {
  private ingresoGastoListenerSubscription: Subscription = new Subscription();
  private ingresoGastoItemsSubscription: Subscription = new Subscription();

  constructor(
    private afs: AngularFirestore,
    public authService: AuthService,
    private store: Store<AppState>
  ) {}

  initIngresoGastoListener() {
    this.ingresoGastoListenerSubscription = this.store
      .select("auth")
      .pipe(filter(auth => auth.user != null))
      .subscribe(auth => {
        // console.log(auth.user.uid);
        this.ingresoGastoItems(auth.user.uid);
      });
  }

  private ingresoGastoItems(uid: string) {
    this.ingresoGastoItemsSubscription = this.afs
      .collection(`${uid}`)
      .doc("ingresos-gastos")
      .collection("items")
      .snapshotChanges()
      .pipe(
        map(docData => {
          return docData.map(doc => {
            return {
              ...doc.payload.doc.data(),
              uid: doc.payload.doc.id
            };
          });
        })
      )
      .subscribe((col: any[]) => {
        // console.log(col);
        this.store.dispatch(setItems({ items: col }));
      });
  }

  cancelarSubscriptions() {
    this.ingresoGastoListenerSubscription.unsubscribe();
    this.ingresoGastoItemsSubscription.unsubscribe();
    this.store.dispatch(unsetItems());
  }

  crearIngresoGasto(ingresoGasto: IngresoEgreso) {
    const user: User = this.authService.getUsuario();
    return this.afs
      .doc(`${user.uid}/ingresos-gastos`)
      .collection("items")
      .add({ ...ingresoGasto });
  }

  borrarIngresoGasto(uid: string) {
    const user: User = this.authService.getUsuario();
    return this.afs
      .doc(`${user.uid}/ingresos-gastos`)
      .collection("items")
      .doc(`${uid}`)
      .delete();
  }
}
