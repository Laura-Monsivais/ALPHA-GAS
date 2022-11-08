import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { AuthenticationService } from ".././services/authentication.service";
import { map } from "rxjs/operators";
import { Selfconsumption } from "../interfaces/selfconsumption";

@Injectable({
  providedIn: "root",
})
export class SelfConsumptionService {
  constructor(
    public http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  action_getSelfconsumptions(request: any) {
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization:
        "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    return this.http
      .post<Selfconsumption>(environment.url + "getSelfconsumptions", request, {
        headers: headers,
      })
      .pipe(map((data) => data));
  }
  action_insertSelfconsumption(request:any){
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    return this.http
      .post(environment.url+'insertSelfconsumption', request, { headers: headers })
      .pipe(map(data => data));
  } 
  action_updateSelfconsumption(request:any){
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    return this.http
      .post(environment.url+'updateSelfconsumption', request, { headers: headers })
      .pipe(map(data => data));
  }
  action_exportSelfconsumption(request: any) {
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    return this.http.post(environment.url + "exportSelfconsumption", request, { headers: headers, responseType: 'blob' });
  }
}
