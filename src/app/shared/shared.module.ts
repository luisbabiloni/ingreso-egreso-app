import { NgModule } from "@angular/core";
import { CommonModule, CurrencyPipe } from "@angular/common";
import { RouterModule } from "@angular/router";
import { registerLocaleData } from "@angular/common";
import localeEs from "@angular/common/locales/eu";
registerLocaleData(localeEs, "es");

import {
  MatIconModule,
  MatTooltipModule,
  MatSnackBarModule,
  MatProgressBarModule
} from "@angular/material";

const material = [
  MatIconModule,
  MatTooltipModule,
  MatSnackBarModule,
  MatProgressBarModule
];

import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { ToastComponent } from "./toast/toast.component";

@NgModule({
  imports: [CommonModule, RouterModule, material],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    ToastComponent
    // CurrencyPipe
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    ToastComponent,
    material
  ],
  entryComponents: [ToastComponent],
  providers: [CurrencyPipe]
})
export class SharedModule {}
