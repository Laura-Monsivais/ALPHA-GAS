import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { AuthenticationService } from ".././services/authentication.service";
import { map } from "rxjs/operators";
import { Sale } from "../interfaces/sale";

@Injectable({
  providedIn: "root",
})
export class SaleService {
  constructor(
    public http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  action_getSales(request: any) {
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization:
        "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    return this.http
      .post<Sale>(environment.url + "getSales", request, { headers: headers })
      .pipe(map((data) => data));
  }
  action_exportSales(request: any) {
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    return this.http.post(environment.url + "exportSales", request, { headers: headers, responseType: 'blob' });
  }
  action_insertSale(sale: any, promotions: any, products: any, services: any) {
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization:
        "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    let request = sale;
    request["saleDetailPromotions"] = promotions;
    request["saleDetailProducts"] = products;
    request["saleDetailServices"] = services;
    return this.http
      .post(environment.url + "insertSale", request, { headers: headers })
      .pipe(map((data) => data));
  }
  action_updateSale(sale:any, promotions: any, products: any, services: any){
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    let request = sale;
    request["saleDetailPromotions"] = promotions;
    request["saleDetailProducts"] = products;
    request["saleDetailServices"] = services;
    return this.http
      .post(environment.url+'updateSale', request, { headers: headers })
      .pipe(map(data => data));
  }
}
