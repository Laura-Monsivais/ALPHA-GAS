import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { AuthenticationService } from ".././services/authentication.service";
import { map } from "rxjs/operators";
import { Transfer } from "../interfaces/transfer";

@Injectable({
  providedIn: "root",
})
export class TransferService {
  constructor(
    public http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  action_getTransfers(request: any) {
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization:
        "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    return this.http
      .post<Transfer>(environment.url + "getTransfers", request, {
        headers: headers,
      })
      .pipe(map((data) => data));
  }
  action_insertTransfer(request: any) {
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization:
        "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    return this.http
      .post(environment.url+'insertTransfer', request, { headers: headers })
      .pipe(map(data => data));
  }   
  action_updateTransfer(request:any){
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization:
        "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    return this.http
      .post(environment.url+'updateTransfer', request, { headers: headers })
      .pipe(map(data => data));
  }
  action_exportTransfers(request: any) {
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization:
        "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    return this.http.post(environment.url + "exportTransfers", request, {
      headers: headers,
      responseType: "blob",
    });
  }
  action_acceptTransfer(request: any) {
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization:
        "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    return this.http
      .post<Transfer>(environment.url + "acceptTransfer", request, {
        headers: headers,
      })
      .pipe(map((data) => data));
  }
}
