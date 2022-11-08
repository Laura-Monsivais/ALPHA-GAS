import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { AuthenticationService } from ".././services/authentication.service";
import { map } from "rxjs/operators";
import { Inventory } from "../interfaces/inventory";

@Injectable({
  providedIn: 'root'
})

export class InventoryService {
  constructor(
    public http: HttpClient,
    private authenticationService: AuthenticationService
  ) { }

  action_getInventories(request:any){
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    return this.http
      .post<Inventory>(environment.url + "getInventories", request, { headers: headers })
      .pipe(map(data => data));
  }  
  action_updateInventory(request:any){
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    return this.http
      .post(environment.url+'updateInventory', request, { headers: headers })
      .pipe(map(data => data));
  }
  action_exportInventories(request: any) {
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    return this.http.post(environment.url + "exportInventories", request, { headers: headers, responseType: 'blob' });
  }
}