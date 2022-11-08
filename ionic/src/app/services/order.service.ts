import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { AuthenticationService } from ".././services/authentication.service";
import { map } from "rxjs/operators";
import { Order } from "../interfaces/order";

@Injectable({
  providedIn: 'root'
})

export class OrderService {

  constructor(
    public http: HttpClient,
    private authenticationService: AuthenticationService
  ) { }

  action_getOrders(request:any){
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    return this.http
      .post<Order>(environment.url + "getOrders", request, { headers: headers })
      .pipe(map(data => data));
  }  
  action_exportOrders(request: any) {
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    return this.http.post(environment.url + "exportOrders", request, { headers: headers, responseType: 'blob' });
  }
  action_insertOrder(order:any, promotions: any, products: any){
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    let request = order;
    request['orderDetailPromotions'] = promotions;
    request['orderDetailProducts'] = products;
    return this.http
      .post(environment.url+'insertOrder', request, { headers: headers })
      .pipe(map(data => data));
  }   
  action_updateOrder(order:any, promotions: any, products: any){
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    let request = order;
    request['orderDetailPromotions'] = promotions;
    request['orderDetailProducts'] = products;
    return this.http
      .post(environment.url+'updateOrder', request, { headers: headers })
      .pipe(map(data => data));
  }
}
