import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { AuthenticationService } from ".././services/authentication.service";
import { Router } from "@angular/router";
import { Business } from 'src/app/interfaces/business';
import { Attention } from "../interfaces/attention";
import { Rol } from "../interfaces/rol";

@Injectable({
  providedIn: "root",
})
export class SelfConsumptionGuard implements CanActivate {
  business: Business = {id: 0, name: "", enterprise_id: 0, attention_id: 0};
  attention: Attention = {id: 0, key: "", name: ""};
  rol: Rol = { id: 0, key: "", name: "" };
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}
  canActivate() {
    this.business = this.authenticationService.localStorage_getBusiness();
    this.attention = this.authenticationService.localStorage_getAttention();  
    this.rol = this.authenticationService.localStorage_getRol();
    if (this.business.name === "Gasera" && this.attention.key === "Order") {
      switch (this.rol.key) {
        case "Super":
          return true;
        break;
        case "Director":
          return true;
        break;
        case "Manager":
          return true;
        break;
        case "Call_Center":
          this.router.navigate(["/login"]);
          return false;
        break;
        case "Seller":
          this.router.navigate(["/login"]);
          return false;
        break;
        case "Client":
          this.router.navigate(["/login"]);
          return false;
        break;
        default:
          this.router.navigate(["/login"]);
          return false;
        break;
      }
    } else {
      switch (this.rol.key) {
        case "Super":
          return true;
        break;
        default:
          this.router.navigate(["/login"]);
          return false;
        break;
      }
    }
  }
}
