import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { AuthenticationService } from ".././services/authentication.service";
import { map } from "rxjs/operators";
import { Promotion } from "../interfaces/promotion";

@Injectable({
  providedIn: 'root'
})

export class PromotionService {
  constructor(
    public http: HttpClient,
    private authenticationService: AuthenticationService
  ) { }

  action_getPromotions(request:any){
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    return this.http
      .post<Promotion>(environment.url + "getPromotions", request, { headers: headers })
      .pipe(map(data => data));
  }  
  action_insertPromotion(request:any){
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    return this.http
      .post(environment.url+'insertPromotion', request, { headers: headers })
      .pipe(map(data => data));
  }    
  action_updatePromotion(request:any){
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    return this.http
      .post(environment.url+'updatePromotion', request, { headers: headers })
      .pipe(map(data => data));
  }
  action_exportPromotions(request: any) {
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    return this.http.post(environment.url + "exportPromotions", request, { headers: headers, responseType: 'blob' });
  }
}
