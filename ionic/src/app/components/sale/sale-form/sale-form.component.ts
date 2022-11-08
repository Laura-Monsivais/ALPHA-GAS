import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sale-form',
  templateUrl: './sale-form.component.html',
  styleUrls: ['./sale-form.component.scss'],
})
export class SaleFormComponent implements OnInit {
  @Input() sale: any;
  @Input() detailSaleQuantity: number;

  constructor(
  ) { }

  ngOnInit() {
  }

}
