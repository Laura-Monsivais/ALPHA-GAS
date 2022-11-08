import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { AuthenticationService } from ".././services/authentication.service";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BuyDetailService {

  constructor(
    public http: HttpClient,
    private authenticationService: AuthenticationService
  ) { }

  action_getBuyDetails(request:any) {
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    return this.http
      .post(environment.url + "getBuyDetails", request, { headers: headers })
      .pipe(map(data => data));
  }  
}
