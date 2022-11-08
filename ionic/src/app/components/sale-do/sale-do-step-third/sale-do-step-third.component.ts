import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-sale-do-step-third",
  templateUrl: "./sale-do-step-third.component.html",
  styleUrls: ["./sale-do-step-third.component.scss"],
})
export class SaleDoStepThirdComponent implements OnInit {
  @Input() sale: any;
  @Input() detailSaleQuantity: number;

  constructor() {
  }

  ngOnInit() {
  }
}
