import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "../interfaces/user";

@Injectable({
  providedIn: "root",
})

export class AuthenticationService {
  
  constructor(
    private http: HttpClient
  ) {}

  action_login(request: any): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.http
      .post<User>(environment.url + "login", request, { 
        headers: headers 
      })
      .pipe(map((data) => data));
  }
  action_getAuth(request: any): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization:
        "Bearer " + this.localStorage_getToken(),
    });
    return this.http
      .post(environment.url + "getAuth", request, {
        headers: headers,
      })
      .pipe(map((data) => data));
  }
  action_getLogs() {
    return environment.url + "getLogs";
  }
  action_logout(request: any) {    
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.http
      .post<User>(
        environment.url + "logout", 
        request,
        { headers: headers }
      )
      .pipe(map((data) => data));
  }
  /*GETTERS*/
  localStorage_getToken() {
    return localStorage.getItem("token");
  }
  localStorage_getUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
  localStorage_getSession() {
    return JSON.parse(localStorage.getItem("session"));
  }
  localStorage_getEnterprise() {
    return JSON.parse(localStorage.getItem("enterprise"));
  }
  localStorage_getBusiness() {
    return JSON.parse(localStorage.getItem("business"));
  }
  localStorage_getCategory() {
    return JSON.parse(localStorage.getItem("category"));
  }
  localStorage_getAttention() {
    return JSON.parse(localStorage.getItem("attention"));
  }
  localStorage_getSubsidiary() {
    return JSON.parse(localStorage.getItem("subsidiary"));
  }
  localStorage_getRol() {
    return JSON.parse(localStorage.getItem("rol"));
  }
  localStorage_getOrderDetailProducts() {
    return JSON.parse(localStorage.getItem("orderDetailProducts"));
  }
  localStorage_getOrderDetailPromotions() {
    return JSON.parse(localStorage.getItem("orderDetailPromotions"));
  }
  localStorage_getSale() {
    return JSON.parse(localStorage.getItem("sale"));
  }
  localStorage_getSaleDetailNotInventories() {
    return JSON.parse(localStorage.getItem("saleDetailNotInventories"));
  }
  localStorage_getSaleDetailPromotions() {
    return JSON.parse(localStorage.getItem("saleDetailPromotions"));
  }
  localStorage_getSaleDetailProducts() {
    return JSON.parse(localStorage.getItem("saleDetailProducts"));
  }
  localStorage_getSaleDetailServices() {
    return JSON.parse(localStorage.getItem("saleDetailServices"));
  }
  localStorage_getBuy() {
    return JSON.parse(localStorage.getItem("buy"));
  }
  localStorage_getBuyDetailProducts() {
    return JSON.parse(localStorage.getItem("buyDetailProducts"));
  }
  localStorage_getBuyDetailServices() {
    return JSON.parse(localStorage.getItem("buyDetailServices"));
  }
  localStorage_getRoute() {
    return JSON.parse(localStorage.getItem("route"));
  }
  localStorage_getRoutePlaces() {
    return JSON.parse(localStorage.getItem("routePlaces"));
  }
  /*SETTERS*/
  localStorage_setToken(token: any): void {
    localStorage.setItem("token", token);
  }
  localStorage_setUser(user: User): void {
    let user_string = JSON.stringify(user);
    localStorage.setItem("user", user_string);
  }
  localStorage_setSession(session: any): void {
    let session_string = JSON.stringify(session);
    localStorage.setItem("session", session_string);
  }
  localStorage_setEnterprise(enterprise: any): void {
    let enterpise_string = JSON.stringify(enterprise);
    localStorage.setItem("enterprise", enterpise_string);
  }
  localStorage_setBusiness(business: any): void {
    let business_string = JSON.stringify(business);
    localStorage.setItem("business", business_string);
  }
  localStorage_setCategory(category: any): void {
    let category_string = JSON.stringify(category);
    localStorage.setItem("category", category_string);
  }
  localStorage_setAttention(attention: any): void {
    let attention_string = JSON.stringify(attention);
    localStorage.setItem("attention", attention_string);
  }
  localStorage_setSubsidiary(subsidiary: any): void {
    let subsidiary_string = JSON.stringify(subsidiary);
    localStorage.setItem("subsidiary", subsidiary_string);
  }
  localStorage_setRol(rol: any): void {
    let rol_string = JSON.stringify(rol);
    localStorage.setItem("rol", rol_string);
  }
  localStorage_setOrderDetailProducts(products: any): void {
    let products_string = JSON.stringify(products);
    localStorage.setItem("orderDetailProducts", products_string);
  }
  localStorage_setOrderDetailPromotions(promotions: any): void {
    let promotions_string = JSON.stringify(promotions);
    localStorage.setItem("orderDetailPromotions", promotions_string);
  }
  localStorage_setSale(sale: any): void {
    let sale_string = JSON.stringify(sale);
    localStorage.setItem("sale", sale_string);
  }
  localStorage_setSaleDetailNotInventories(promotions: any): void {
    let promotions_string = JSON.stringify(promotions);
    localStorage.setItem("saleDetailNotInventories", promotions_string);
  }
  localStorage_setSaleDetailPromotions(promotions: any): void {
    let promotions_string = JSON.stringify(promotions);
    localStorage.setItem("saleDetailPromotions", promotions_string);
  }
  localStorage_setSaleDetailProducts(products: any): void {
    let products_string = JSON.stringify(products);
    localStorage.setItem("saleDetailProducts", products_string);
  }
  localStorage_setSaleDetailServices(services: any): void {
    let services_string = JSON.stringify(services);
    localStorage.setItem("saleDetailServices", services_string);
  }
  localStorage_setBuy(buy: any): void {
    let buys_string = JSON.stringify(buy);
    localStorage.setItem("buy", buys_string);
  }
  localStorage_setBuyDetailProducts(products: any): void {
    let products_string = JSON.stringify(products);
    localStorage.setItem("buyDetailProducts", products_string);
  }
  localStorage_setBuyDetailServices(services: any): void {
    let services_string = JSON.stringify(services);
    localStorage.setItem("buyDetailServices", services_string);
  }
  localStorage_setRoute(route: any): void {
    let route_string = JSON.stringify(route);
    localStorage.setItem("route", route_string);
  }
  localStorage_setRoutePlaces(places: any): void {
    let places_string = JSON.stringify(places);
    localStorage.setItem("routePlaces", places_string);
  }
  /*REMOVES*/  
  localStorage_removeToken(): void {
    localStorage.removeItem("token");
  }
  localStorage_removeUser(): void {
    localStorage.removeItem("user");
  }
  localStorage_removeSession(): void {
    localStorage.removeItem("session");
  }
  localStorage_removeEnterprise(): void {
    localStorage.removeItem("enterprise");
  }
  localStorage_removeBusiness(): void {
    localStorage.removeItem("business");
  }
  localStorage_removeCategory(): void {
    localStorage.removeItem("category");
  }
  localStorage_removeAttention(): void {
    localStorage.removeItem("attention");
  }
  localStorage_removeSubsidiary(): void {
    localStorage.removeItem("subsidiary");
  }
  localStorage_removeRol(): void {
    localStorage.removeItem("rol");
  }
  localStorage_removeOrderDetailProducts(): void {
    localStorage.removeItem("orderDetailProducts");
  }
  localStorage_removeOrderDetailPromotions(): void {
    localStorage.removeItem("orderDetailPromotions");
  }
  localStorage_removeSale(): void {
    localStorage.removeItem("sale");
  }
  localStorage_removeSaleDetailNotInventories(): void {
    localStorage.removeItem("saleDetailNotInventories");
  }
  localStorage_removeSaleDetailPromotions(): void {
    localStorage.removeItem("saleDetailPromotions");
  }
  localStorage_removeSaleDetailProducts(): void {
    localStorage.removeItem("saleDetailProducts");
  }
  localStorage_removeSaleDetailServices(): void {
    localStorage.removeItem("saleDetailServices");
  }
  localStorage_removeBuy(): void {
    localStorage.removeItem("buy");
  }
  localStorage_removeBuyDetailProducts(): void {
    localStorage.removeItem("buyDetailProducts");
  }
  localStorage_removeBuyDetailServices(): void {
    localStorage.removeItem("buyDetailServices");
  }
  localStorage_removeRoute(): void {
    localStorage.removeItem("route");
  }
  localStorage_removeRoutePlaces(): void {
    localStorage.removeItem("routePlaces");
  }
  /*API's*/
  api_getAddresses(postalCode: string){
    var token = "8533d9db-7dbe-4cad-abd6-5a926c76fc9f";
    return this.http
    .get("https://api-sepomex.hckdrk.mx/query/info_cp/" + postalCode + "?token=" + token + "&&type=simplified")
    .pipe(map((data) => data));
  }
  api_getStates(){
    var token = "8533d9db-7dbe-4cad-abd6-5a926c76fc9f";
    return this.http
    .get("https://api-sepomex.hckdrk.mx/query/get_estados?token=" + token)
    .pipe(map((data) => data));
  }
  api_getMunicipalities(state: string){
    var token = "8533d9db-7dbe-4cad-abd6-5a926c76fc9f";
    return this.http
    .get("https://api-sepomex.hckdrk.mx/query/get_municipio_por_estado/" + state + "?token=" + token)
    .pipe(map((data) => data));
  }
  api_getPostalCodes(municipality: string){
    var token = "8533d9db-7dbe-4cad-abd6-5a926c76fc9f";
    return this.http
    .get("https://api-sepomex.hckdrk.mx/query/get_cp_por_municipio/" + municipality + "?token=" + token)
    .pipe(map((data) => data));
  }
  api_getNeighborhoods(municipality: string){
    var token = "8533d9db-7dbe-4cad-abd6-5a926c76fc9f";
    return this.http
    .get("https://api-sepomex.hckdrk.mx/query/get_colonia_por_municipio/" + municipality + "?token=" + token)
    .pipe(map((data) => data));
  }
}
