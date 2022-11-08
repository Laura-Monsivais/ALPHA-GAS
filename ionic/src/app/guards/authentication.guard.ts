import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { AuthenticationService } from ".././services/authentication.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}
  canActivate() {
    if (this.authenticationService.localStorage_getToken()) {
        return true;
    } else {
        this.router.navigate(["/login"]);
        return false;
    } 
  }
}
