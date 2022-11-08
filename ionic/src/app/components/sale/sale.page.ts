import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import {Params} from '@angular/router';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.page.html',
  styleUrls: ['./sale.page.scss'],
})

export class SalePage implements OnInit {
  isAddedArticle: boolean = false;
  isGotArticles: boolean = false;
  getSales: Boolean;
  constructor(
    private activatedRoute : ActivatedRoute) {

  }

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.getSales = this.activatedRoute.snapshot.params.getSales;
  }
  ionViewDidLeave() {
  }
  method_detectIfGotArticle(event:boolean){
    if(event){
      this.isGotArticles = true;
    } else {
      this.isGotArticles = false;
    }
}

}
