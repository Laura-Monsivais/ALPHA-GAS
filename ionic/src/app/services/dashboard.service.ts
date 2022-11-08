import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { AuthenticationService } from ".././services/authentication.service";
import { map } from "rxjs/operators";
import { Dashboard } from "../interfaces/dashboard";

@Injectable({
  providedIn: "root",
})
export class DashboardService {
  constructor(
    public http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}
  action_getSubsidiariesSales(request: any) {
    let headers: HttpHeaders = new HttpHeaders({
      enctype: "multipart/form-data",
      Authorization: "Bearer " + this.authenticationService.localStorage_getToken(),
    });
    return this.http
      .post<Dashboard>(environment.url + "getSubsidiaresSales", request, {
        headers: headers,
      })
      .pipe(map((data) => data));
  }
}
