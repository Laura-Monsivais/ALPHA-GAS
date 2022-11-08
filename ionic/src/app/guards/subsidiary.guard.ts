import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from ".././services/authentication.service";
import { Router } from "@angular/router";
import { Rol } from "../interfaces/rol";

@Injectable({
  providedIn: 'root'
})
export class SubsidiaryGuard implements CanActivate {
  rol: Rol = {id: 0, key: "", name: ""};
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}
  canActivate() {
    this.rol = this.authenticationService.localStorage_getRol();    
    switch (this.rol.key) {
      case "Super":
        return true;
      break;
      case "Director":
        return true;
      break;    
      case "Manager":
        this.router.navigate(["/login"]);
        return false;
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
  }
  
}
