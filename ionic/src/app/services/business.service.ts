import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { AuthenticationService } from ".././services/authentication.service";
import { map } from "rxjs/operators";
import { Business } from "../interfaces/business";

@Injectable({
  providedIn: "root",
})
export class BusinessService {
  constructor(
    public http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  action_getBusinesses(request: any) {
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    return this.http
      .post<Business>(environment.url + "getBusinesses", request, {
        headers: headers,
      })
      .pipe(map((data) => data));
  }
  action_insertBusiness(request:any){
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    return this.http
      .post(environment.url+'insertBusiness', request, { headers: headers })
      .pipe(map(data => data));
  }   
  action_updateBusiness(request:any){
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    return this.http
      .post(environment.url+'updateBusiness', request, { headers: headers })
      .pipe(map(data => data));
  }
  action_exportBusinesses(request: any) {
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    return this.http.post(environment.url + "exportBusinesses", request, { headers: headers, responseType: 'blob' });
  }
}
