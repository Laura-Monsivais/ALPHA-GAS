import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AuthenticationService } from "./authentication.service";
import { Route } from "../interfaces/route";

@Injectable({
  providedIn: 'root'
})

export class RouteService {

  constructor(
    public http: HttpClient,
    private authenticationService: AuthenticationService
  ) { }

  action_getRoutes(request:any) {
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    return this.http
      .post<Route>(environment.url + "getRoutes", request, { headers: headers })
      .pipe(map(data => data));
  }  
  action_insertRoute(route:any, routePlaces: any): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders({
      enctype: "multipart/form-data",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    let request = route;
    request["routePlaces"] = routePlaces;
    return this.http
      .post<Route>(environment.url+'insertRoute', request, { headers: headers })
      .pipe(map(data => data));
  }    
  action_updateRoute(route:any, routePlaces: any): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders({
      enctype: "multipart/form-data",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    let request = route;
    request["routePlaces"] = routePlaces;
    return this.http
      .post<Route>(environment.url+'updateRoute', request, { headers: headers })
      .pipe(map(data => data));
  }  
  action_exportRoutes(request: any) {
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    return this.http.post(environment.url + "exportRoutes", request, { headers: headers, responseType: 'blob' });
  }
}
