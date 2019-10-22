import { Component, Inject, OnInit } from "@angular/core";
import { MAT_SNACK_BAR_DATA } from "@angular/material";
import { interval } from "rxjs";

@Component({
  selector: "app-toast",
  templateUrl: "./toast.component.html",
  styleUrls: ["./toast.component.scss"]
})
export class ToastComponent implements OnInit {
  progressbarValue = 100;
  curSec = 0;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    const seconds = 4;
    const timer$ = interval(1000);
    const sub = timer$.subscribe(sec => {
      this.progressbarValue = 100 - (sec * 100) / seconds;
      this.curSec = sec;
      if (this.curSec === seconds) {
        sub.unsubscribe();
      }
    });
  }

  ngOnInit() {}
}
