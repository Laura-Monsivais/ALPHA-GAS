import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { AuthenticationService } from ".././services/authentication.service";
import { map } from "rxjs/operators";
import { Buy } from "../interfaces/buy";

@Injectable({
  providedIn: "root",
})
export class BuyService {
  constructor(
    public http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  action_getBuys(request: any) {
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization:
        "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    return this.http
      .post<Buy>(environment.url + "getBuys", request, { headers: headers })
      .pipe(map((data) => data));
  }
  action_insertBuy(buy: any, products: any, services: any) {
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization:
        "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    let request = buy;
    request["buyDetailProducts"] = products;
    request["buyDetailServices"] = services;
    return this.http
      .post(environment.url + "insertBuy", request, { headers: headers })
      .pipe(map((data) => data));
  }
  action_updateBuy(buy:any, products: any, services: any){
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    let request = buy;
    request["buyDetailProducts"] = products;
    request["buyDetailServices"] = services;
    return this.http
      .post(environment.url+'updateBuy', request, { headers: headers })
      .pipe(map(data => data));
  }
  action_exportBuys(request: any) {
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    return this.http.post(environment.url + "exportBuys", request, { headers: headers, responseType: 'blob' });
  }
}
