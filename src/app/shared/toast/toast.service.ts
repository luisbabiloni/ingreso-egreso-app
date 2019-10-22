import { Injectable, NgZone } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material";

import { ToastComponent } from "./toast.component";

@Injectable({
  providedIn: "root"
})
export class ToastService {
  constructor(private readonly snackBar: MatSnackBar, private readonly zone: NgZone) {}

  private show(message: string, configuration: MatSnackBarConfig) {
    // Need to open snackBar from Angular zone to prevent issues with its position per
    // https://stackoverflow.com/questions/50101912/snackbar-position-wrong-when-use-errorhandler-in-angular-5-and-material
    this.zone.run(() => this.snackBar.openFromComponent(ToastComponent, configuration));
  }

  info(message: string) {
    this.show(message, {
      duration: 5000,
      panelClass: "info-notification-overlay",
      data: message
    });
  }

  exito(message: string) {
    this.show(message, {
      duration: 5000,
      panelClass: "exito-notification-overlay",
      data: message
    });
  }

  cuidado(message: string) {
    this.show(message, {
      duration: 5000,
      panelClass: "cuidado-notification-overlay",
      data: message
    });
  }

  error(message: string) {
    this.show(message, {
      duration: 5000,
      panelClass: "error-notification-overlay",
      data: message
    });
  }
}
