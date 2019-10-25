import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { User } from "src/app/auth/user.model";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.state";
import { filter } from "rxjs/operators";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styles: []
})
export class NavbarComponent implements OnInit, OnDestroy {
  user: User;
  subscription: Subscription = new Subscription();

  constructor(private store: Store<AppState>) {}

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
}
