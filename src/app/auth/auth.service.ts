import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";

import * as firebase from "firebase";
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";

import { ToastService } from "../shared/toast/toast.service";
import { User } from "./user.model";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private toastService: ToastService,
    private afs: AngularFirestore
  ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe((fbUser: firebase.User) => {
      console.log(fbUser);
    });
  }

  crearUsuario(nombre: string, email: string, password: string) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(resp => {
        // console.log(resp);
        const user: User = {
          uid: resp.user.uid,
          nombre: nombre,
          email: resp.user.email
        };

        this.afs
          .doc(`${user.uid}/usuario`)
          .set(user)
          .then(() => {
            this.router.navigate(["/"]);
          });
      })
      .catch(err => {
        // console.error(err);
        this.toastService.error("Error: email de Usuario ya existe!!!");
      });
  }

  login(email: string, password: string) {
    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(resp => {
        // console.log(resp);
        this.router.navigate(["/"]);
      })
      .catch(err => {
        console.error(err);
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
}
