import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AuthenticationService } from "./authentication.service";
import { RouteType } from "../interfaces/routetype";

@Injectable({
  providedIn: 'root'
})

export class RouteTypeService {

  constructor(
    public http: HttpClient,
    private authenticationService: AuthenticationService
  ) { }

  action_getRouteTypes(request:any) {
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    return this.http
      .post<RouteType>(environment.url + "getRouteTypes", request, { headers: headers })
      .pipe(map(data => data));
  }    
}
