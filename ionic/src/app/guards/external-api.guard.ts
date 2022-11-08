import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from ".././services/authentication.service";
import { Router } from "@angular/router";
import { Attention } from "../interfaces/attention";
import { Rol } from "../interfaces/rol";

@Injectable({
  providedIn: 'root'
})
export class ExternalApiGuard implements CanActivate {
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
