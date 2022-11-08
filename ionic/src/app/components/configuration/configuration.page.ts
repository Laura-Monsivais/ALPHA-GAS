import { Component, OnInit } from "@angular/core";
import { Rol } from "../../interfaces/rol";
import { AuthenticationService } from "../../services/authentication.service";

@Component({
  selector: "app-configuration",
  templateUrl: "./configuration.page.html",
  styleUrls: ["./configuration.page.scss"],
})

export class ConfigurationPage implements OnInit {
  rol: Rol = {id: 0, key: "", name: ""};

  constructor(
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.rol = this.authenticationService.localStorage_getRol();
  }
  ionViewDidLeave() {
  }
}
