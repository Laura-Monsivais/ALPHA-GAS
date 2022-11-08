import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AuthenticationService } from "./authentication.service";
import { User } from "../interfaces/user";

@Injectable({
  providedIn: "root",
})

export class UserService {

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  action_getUsers(request: any) {
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    return this.http
      .post<User>(environment.url + "getUsers", request, { headers: headers })
      .pipe(map((data) => data));
  }
  action_exportUsers(request: any) {
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    return this.http.post(environment.url + "exportUsers", request, { headers: headers, responseType: 'blob' });
  }
  action_insertUser(user:any, session:any): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders({
      enctype: "multipart/form-data",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    let formData: FormData = new FormData();
    formData.append("avatarForm", user.avatarFile);
    formData.append("coverForm", user.coverFile);
    formData.append("user", JSON.stringify(user));
    formData.append("session", JSON.stringify(session));
    return this.http
      .post<User>(environment.url+'insertUser', formData, { headers: headers })
      .pipe(map(data => data));
  }
  action_updateUser(user:any, session:any): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders({
      enctype: "multipart/form-data",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    let formData: FormData = new FormData();
    formData.append("avatarForm", user.avatarFile);
    formData.append("coverForm", user.coverFile);
    formData.append("user", JSON.stringify(user));
    formData.append("session", JSON.stringify(session));
    return this.http
      .post<User>(environment.url + "updateUser", formData, { headers: headers })
      .pipe(map((data) => data));
  }   
  action_updateUserSessionId(request: any) {    
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    return this.http
      .post(
        environment.url + "updateUserSessionId", 
        request,
        { headers: headers }
      )
      .pipe(map((data) => data));
  }
  action_getUserAvatar(userAvatar:string) {
    return environment.url+'getUserAvatar/'+userAvatar; 
  }
  action_downloadUserAvatar(request:any) {
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken()
    });
    return this.http.post(environment.url+'downloadUserAvatar', request, { headers: headers, responseType: 'blob' });
  }
  action_getUserCover(userCover:string) {
    return environment.url+'getUserCover/'+userCover; 
  }
  action_downloadUserCover(request:any) {
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken()
    });
    return this.http.post(environment.url+'downloadUserCover', request, { headers: headers, responseType: 'blob' });
  }
}
