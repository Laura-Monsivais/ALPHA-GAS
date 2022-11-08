import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-buy-form',
  templateUrl: './buy-form.component.html',
  styleUrls: ['./buy-form.component.scss'],
})
export class BuyFormComponent implements OnInit {
  @Input() buy: any;
  @Input() detailBuyQuantity: number;
  constructor() { }

  ngOnInit() {}

}
