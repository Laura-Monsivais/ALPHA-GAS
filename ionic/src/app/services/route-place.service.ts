import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AuthenticationService } from "./authentication.service";
import { RoutePlace } from '../interfaces/route-place';

@Injectable({
  providedIn: 'root'
})

export class RoutePlaceService {

  constructor(
    public http: HttpClient,
    private authenticationService: AuthenticationService
  ) { }

  action_getRoutePlaces(request:any) {
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    return this.http
      .post<RoutePlace>(environment.url + "getRoutePlaces", request, { headers: headers })
      .pipe(map(data => data));
  }  
}
