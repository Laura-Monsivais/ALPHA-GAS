import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../../services/authentication.service";
import { Rol } from "../../../interfaces/rol";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-navbar-bottom',
  templateUrl: './navbar-bottom.component.html',
  styleUrls: ['./navbar-bottom.component.scss'],
})

export class NavbarBottomComponent implements OnInit {
  rol: Rol = {id: 0, key: "", name: ""};
  getLogs: string;
  year: number;

  constructor(
    private authenticationService: AuthenticationService,
    private sanitizer:DomSanitizer
  ) { }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
    this.getLogs = this.authenticationService.action_getLogs();
    let date = new Date();
    this.year = date.getFullYear();
  }

  method_sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
