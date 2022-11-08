import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-buy",
  templateUrl: "./buy.page.html",
  styleUrls: ["./buy.page.scss"],
})
export class BuyPage implements OnInit {
  isAddedArticle: boolean = false;
  isGotArticles: boolean = false;
  getBuys: Boolean;
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {}
  ionViewDidEnter() {
    this.getBuys = this.activatedRoute.snapshot.params.getBuys;
  }
  ionViewDidLeave() {}
  method_detectIfGotArticle(event: boolean) {
    if (event) {
      this.isGotArticles = true;
    } else {
      this.isGotArticles = false;
    }
  }
}
