import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from "../services/authentication.service";
import { Router } from "@angular/router";
import { Business } from 'src/app/interfaces/business';
import { Rol } from "../interfaces/rol";

@Injectable({
  providedIn: 'root'
})

export class DonationGuard implements CanActivate {
  business: Business = {id: 0, name: "", enterprise_id: 0, attention_id: 0};
  rol: Rol = {id: 0, key: "", name: ""};

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  canActivate() {
    this.business = this.authenticationService.localStorage_getBusiness();
    this.rol = this.authenticationService.localStorage_getRol();   
    if (this.business.name === "Gasera") { 
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
