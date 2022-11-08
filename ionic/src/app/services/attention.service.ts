import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { AuthenticationService } from ".././services/authentication.service";
import { map } from "rxjs/operators";
import { Attention } from "../interfaces/attention";

@Injectable({
  providedIn: 'root'
})
export class AttentionService {

  constructor(
    public http: HttpClient,
    private authenticationService: AuthenticationService
  ) { }  

  action_getAttentions(request: any) {
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    return this.http
      .post<Attention>(environment.url + "getAttentions", request, {
        headers: headers,
      })
      .pipe(map((data) => data));
  }
}
