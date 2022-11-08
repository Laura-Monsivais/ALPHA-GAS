import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from "../services/authentication.service";
import { Router } from "@angular/router";
import { Attention } from "../interfaces/attention";
import { Rol } from "../interfaces/rol";

@Injectable({
  providedIn: 'root'
})
export class ServiceGuard implements CanActivate {
  attention: Attention = {id: 0, key: "", name: ""};
  rol: Rol = {id: 0, key: "", name: ""};
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}
  canActivate() {
    this.attention = this.authenticationService.localStorage_getAttention(); 
    this.rol = this.authenticationService.localStorage_getRol();  
    if (this.attention.key === "Subsidiary") {      
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
          return true;
        break;
        case "Seller":
          return true;
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