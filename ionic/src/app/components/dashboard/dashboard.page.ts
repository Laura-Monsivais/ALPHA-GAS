import { Component, OnInit } from "@angular/core";
import { Rol } from "../../interfaces/rol";
import { AuthenticationService } from "../../services/authentication.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.page.html",
  styleUrls: ["./dashboard.page.scss"],
})
export class DashboardPage implements OnInit {
  rol: Rol = {id: 0, key: "", name: ""};

  constructor(
    private authenticationService : AuthenticationService) {}

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.rol = this.authenticationService.localStorage_getRol();
  }
  ionViewDidLeave() {
  }
}
