import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { AuthenticationService } from ".././services/authentication.service";
import { Session } from "../interfaces/session";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class SessionService {
  isSessionLoggedIn : boolean;
  public SessionLogged:Session;
  constructor(
    public http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  
  action_getSessions(request:any){
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    return this.http
      .post<Session>(environment.url + "getSessions", request, { headers: headers })
      .pipe(map(data => data));
  } 
  action_exportSessions(request: any) {
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    return this.http.post(environment.url + "exportSessions", request, { headers: headers, responseType: 'blob' });
  }
}
