import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AuthenticationService } from ".././services/authentication.service";
import { Enterprise } from "../interfaces/enterprise";

@Injectable({
  providedIn: "root",
})

export class EnterpriseService {

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  action_insideGetEnterprises(request: any) {    
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    return this.http
      .post<Enterprise>(environment.url + "inside/getEnterprises", request, { headers: headers })
      .pipe(map((data) => data));
  }
  action_insertEnterprise(request:any): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders({
      enctype: "multipart/form-data",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    let formData: FormData = new FormData();
    formData.append("logoForm", request.logoFile);
    formData.append("overlayForm", request.overlayFile);
    formData.append("enterprise", JSON.stringify(request));
    return this.http
      .post<Enterprise>(environment.url+'insertEnterprise', formData, { headers: headers })
      .pipe(map(data => data));
  }
  action_updateEnterprise(request: any): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders({
      enctype: "multipart/form-data",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    let formData: FormData = new FormData();
    formData.append("logoForm", request.logoFile);
    formData.append("overlayForm", request.overlayFile);
    formData.append("enterprise", JSON.stringify(request));
    return this.http
      .post<Enterprise>(environment.url+'updateEnterprise', formData, { headers: headers })
      .pipe(map(data => data));
  }
  action_insideGetEnterpriseLogo(request: any) {
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    return this.http
      .post(environment.url + "inside/getEnterpriseLogo", request, { headers: headers, responseType: 'blob' })
      .pipe(map((data) => data));
  }
  action_downloadEnterpriseLogo(request:any) {
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken()
    });
    return this.http.post(environment.url+'downloadEnterpriseLogo', request, { headers: headers, responseType: 'blob' });
  }
  action_getEnterpriseOverlay(request:any) {
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    return this.http
      .post(environment.url + "getEnterpriseOverlay", request, { headers: headers, responseType: 'blob' })
      .pipe(map((data) => data));
  }
  action_downloadEnterpriseOverlay(request:any) {
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken()
    });
    return this.http.post(environment.url+'downloadEnterpriseOverlay', request, { headers: headers, responseType: 'blob' });
  }
  action_exportEnterprises(request: any) {
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    return this.http.post(environment.url + "exportEnterprises", request, { headers: headers, responseType: 'blob' });
  }

  action_outsideGetEnterprises(request: any) {    
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    return this.http
      .post<Enterprise>(environment.url + "outside/getEnterprises", request, { headers: headers })
      .pipe(map((data) => data));
  }
  action_outsideGetEnterpriseLogo(enterpriseLogo: string) {
    return environment.url + "outside/getEnterpriseLogo/" + enterpriseLogo;
  }
}
