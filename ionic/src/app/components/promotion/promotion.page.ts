import { Component, OnInit } from '@angular/core';
import { Rol } from "../../interfaces/rol";
import { AuthenticationService } from "../../services/authentication.service";
@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.page.html',
  styleUrls: ['./promotion.page.scss'],
})

export class PromotionPage implements OnInit {
  rol: Rol = {id: 0, key: "", name: ""};
  isAddedArticle: boolean = false;
  isGotArticles: boolean = false;

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.rol = this.authenticationService.localStorage_getRol();
  }
  ionViewDidLeave() {
  }
  method_detectIfAddedArticle(event:boolean){
    if(event){
      this.isAddedArticle = true;
    } else {
      this.isAddedArticle = false;
    }
  }
  method_detectIfGotArticle(event:boolean){
    if(event){
      this.isGotArticles = true;
    } else {
      this.isGotArticles = false;
    }
  }
}
