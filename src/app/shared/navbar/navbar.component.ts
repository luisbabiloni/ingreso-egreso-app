import { Component, OnInit } from "@angular/core";
import { ToastService } from "../toast/toast.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styles: []
})
export class NavbarComponent implements OnInit {
  constructor(private toastService: ToastService) {}

  ngOnInit() {}

  info() {
    this.toastService.info("info: texto...");
  }

  exito() {
    this.toastService.exito("exito: texto...");
  }

  cuidado() {
    this.toastService.cuidado("cuidado: texto...");
  }

  error() {
    this.toastService.error("Error: texto...");
  }
}
