import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-buy-do-step-third',
  templateUrl: './buy-do-step-third.component.html',
  styleUrls: ['./buy-do-step-third.component.scss'],
})
export class BuyDoStepThirdComponent implements OnInit {
  @Input() buy: any;
  @Input() detailBuyQuantity: number;
  
  constructor() { }

  ngOnInit() {}

}
