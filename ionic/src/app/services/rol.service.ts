import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { map } from "rxjs/operators";
import { AuthenticationService } from ".././services/authentication.service";
import { Rol } from "../interfaces/rol";

@Injectable({
  providedIn: 'root'
})

export class RolService {

  constructor(
    public http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  action_getRoles(request:any){
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    return this.http
      .post<Rol>(environment.url + "getRoles", request, { headers: headers })
      .pipe(map(data => data));
  }
  action_getRolManual(rolManual: string) {
    return environment.url + "getRolManual/" + rolManual;
  }
  action_downloadRolManual(request:any){
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken()
    });
    return this.http.post(environment.url+'downloadRolManual', request, { headers: headers, responseType: 'blob' });
  }
}
