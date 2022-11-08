import { Component, OnInit } from '@angular/core';
import { Rol } from "../../interfaces/rol";
import { AuthenticationService } from "../../services/authentication.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-route',
  templateUrl: './route.page.html',
  styleUrls: ['./route.page.scss'],
})
export class RoutePage implements OnInit {
  rol: Rol = {id: 0, key: "", name: ""};
  getRoutes: Boolean;

  constructor(
    private authenticationService: AuthenticationService,
    private activatedRoute : ActivatedRoute
  ) { }

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.rol = this.authenticationService.localStorage_getRol();
    this.getRoutes = this.activatedRoute.snapshot.params.getRoutes;
  }
  ionViewDidLeave() {
  }
}
