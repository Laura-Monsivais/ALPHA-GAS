import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AuthenticationService } from ".././services/authentication.service";
import { Subsidiary } from "../interfaces/subsidiary";

@Injectable({
  providedIn: "root",
})

export class SubsidiaryService {

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  action_getSubsidiaries(request: any) {    
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    return this.http
      .post<Subsidiary>(environment.url + "getSubsidiaries", request, { headers: headers })
      .pipe(map((data) => data));
  }
  action_insertSubsidiary(request:any): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders({
      enctype: "multipart/form-data",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    let formData: FormData = new FormData();
    formData.append("logoForm", request.logoFile);
    formData.append("overlayForm", request.overlayFile);
    formData.append("subsidiary", JSON.stringify(request));
    return this.http
      .post<Subsidiary>(environment.url+'insertSubsidiary', formData, { headers: headers })
      .pipe(map(data => data));
  }
  action_updateSubsidiary(request: any): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders({
      enctype: "multipart/form-data",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    let formData: FormData = new FormData();
    formData.append("logoForm", request.logoFile);
    formData.append("overlayForm", request.overlayFile);
    formData.append("subsidiary", JSON.stringify(request));
    return this.http
      .post<Subsidiary>(environment.url+'updateSubsidiary', formData, { headers: headers })
      .pipe(map(data => data));
  }
  action_getSubsidiaryLogo(subsidiaryLogo: string) {
    return environment.url + "getSubsidiaryLogo/" + subsidiaryLogo;
  }
  action_downloadSubsidiaryLogo(request:any) {
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken()
    });
    return this.http.post(environment.url+'downloadSubsidiaryLogo', request, { headers: headers, responseType: 'blob' });
  }
  action_getSubsidiaryOverlay(subsidiaryOverlay: string) {
    return environment.url + "getSubsidiaryOverlay/" + subsidiaryOverlay;
  }
  action_downloadSubsidiaryOverlay(request:any) {
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken()
    });
    return this.http.post(environment.url+'downloadSubsidiaryOverlay', request, { headers: headers, responseType: 'blob' });
  }
  action_exportSubsidiaries(request: any) {
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    return this.http.post(environment.url + "exportSubsidiaries", request, { headers: headers, responseType: 'blob' });
  }
}
