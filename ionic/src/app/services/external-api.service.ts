import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { AuthenticationService } from ".././services/authentication.service";
import { map } from "rxjs/operators";
import { ExternalApi } from "../interfaces/external-api";

@Injectable({
  providedIn: 'root'
})

export class ExternalApiService {
  constructor(
    public http: HttpClient,
    private authenticationService: AuthenticationService
  ) { }

  action_getExternalApis(request:any){
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    return this.http
      .post<ExternalApi>(environment.url + "getExternalApis", request, { headers: headers })
      .pipe(map(data => data));
  }  
  action_insertExternalApi(request:any){
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    return this.http
      .post(environment.url+'insertExternalApi', request, { headers: headers })
      .pipe(map(data => data));
  }    
  action_updateExternalApi(request:any){
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    return this.http
      .post(environment.url+'updateExternalApi', request, { headers: headers })
      .pipe(map(data => data));
  }
  action_exportExternalApis(request: any) {
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    return this.http.post(environment.url + "exportExternalApis", request, { headers: headers, responseType: 'blob' });
  }
}
