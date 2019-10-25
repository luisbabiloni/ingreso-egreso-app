import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";

import * as firebase from "firebase";
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { Subscription } from "rxjs";

import { ToastService } from "../shared/toast/toast.service";
import { User } from "./user.model";

import { AppState } from "../app.state";
import { Store } from "@ngrx/store";
import * as UiActions from "../shared/ui.actions";
import * as AuthActions from "./auth.actions";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private userSubscription: Subscription = new Subscription();
  private usuario: User;

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private toastService: ToastService,
    private afs: AngularFirestore,
    private store: Store<AppState>
  ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe((fbUser: firebase.User) => {
      if (fbUser) {
        this.userSubscription = this.afs
          .doc(`${fbUser.uid}/usuario`)
          .valueChanges()
          .subscribe((usuarioObj: any) => {
            const newUser = new User(usuarioObj);
            this.store.dispatch(AuthActions.setUser({ user: newUser }));
            this.usuario = newUser;
            // console.log(this.usuario);
          });
      } else {
        this.usuario = null;
        this.userSubscription.unsubscribe();
      }
    });
  }

  crearUsuario(nombre: string, email: string, password: string) {
    this.store.dispatch(UiActions.activarLoading());

    this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(resp => {
        // console.log(resp);
        const user: User = {
          uid: resp.user.uid,
          // tslint:disable-next-line: object-literal-shorthand
          nombre: nombre,
          email: resp.user.email
        };

        this.afs
          .doc(`${user.uid}/usuario`)
          .set(user)
          .then(() => {
            this.router.navigate(["/"]);
            this.store.dispatch(UiActions.activarLoading());
          });
      })
      .catch(err => {
        // console.error(err);
        this.store.dispatch(UiActions.activarLoading());
        this.toastService.error("Error: email de Usuario ya existe!!!");
      });
  }

  login(email: string, password: string) {
    this.store.dispatch(UiActions.activarLoading());

    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(resp => {
        // console.log(resp);
        this.router.navigate(["/"]);
        this.store.dispatch(UiActions.desactivarLoading());
      })
      .catch(err => {
        console.error(err);
        this.store.dispatch(UiActions.desactivarLoading());
        this.toastService.error("Error: en el login!!!");
      });
  }

  logout() {
    this.router.navigate(["/login"]);
    this.afAuth.auth.signOut();
  }

  estaAutenticado() {
    return this.afAuth.authState.pipe(
      map(fbUser => {
        if (fbUser === null) {
          this.router.navigate(["/login"]);
        }
        return fbUser != null;
      })
    );
  }

  getUsuario() {
    return { ...this.usuario };
  }
}
