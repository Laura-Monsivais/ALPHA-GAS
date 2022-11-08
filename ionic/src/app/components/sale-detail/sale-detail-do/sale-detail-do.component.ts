import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from "@angular/core";
import { AuthenticationService } from "../../../services/authentication.service";

@Component({
  selector: "app-sale-detail-do",
  templateUrl: "./sale-detail-do.component.html",
  styleUrls: ["./sale-detail-do.component.scss"],
})
export class SaleDetailDoComponent implements OnInit, OnChanges {
  @Input() addBy: string = "quantity";
  @Input() saleDetailsNotInventories: any = [];
  @Input() saleDetailsPromotions: any = [];
  @Input() saleDetailsProducts: any = [];
  @Input() saleDetailsServices: any = [];
  constructor(
    private authenticationService: AuthenticationService
  ) {}
  ngOnChanges() {
  }
  ngOnInit() {
  }
}
