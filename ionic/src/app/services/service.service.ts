import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { AuthenticationService } from ".././services/authentication.service";
import { map } from "rxjs/operators";
import { Service } from "../interfaces/service";

@Injectable({
  providedIn: "root",
})
export class ServiceService {
  constructor(
    public http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  action_getServices(request: any) {
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization:
        "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    return this.http
      .post<Service>(environment.url + "getServices", request, {
        headers: headers,
      })
      .pipe(map((data) => data));
  }
  action_insertService(request:any){
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    return this.http
      .post(environment.url+'insertService', request, { headers: headers })
      .pipe(map(data => data));
  }
  action_updateService(request:any){
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    return this.http
      .post(environment.url+'updateService', request, { headers: headers })
      .pipe(map(data => data));
  } 
  
  action_exportServices(request: any) {
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    return this.http.post(environment.url + "exportServices", request, { headers: headers, responseType: 'blob' });
  }
}
