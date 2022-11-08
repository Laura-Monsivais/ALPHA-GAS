import { Component, OnInit, Input, OnChanges} from "@angular/core";

@Component({
  selector: "app-buy-detail-do",
  templateUrl: "./buy-detail-do.component.html",
  styleUrls: ["./buy-detail-do.component.scss"],
})
export class BuyDetailDoComponent implements OnInit , OnChanges {
  @Input() addBy: string = "quantity";
  @Input() buyDetailsProducts: any = [];
  @Input() buyDetailsServices: any = [];
  constructor(
  ) {}
  ngOnChanges() {
  }
  ngOnInit() {
  }
}
