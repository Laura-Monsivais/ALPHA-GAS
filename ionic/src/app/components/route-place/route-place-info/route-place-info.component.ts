import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { Rol } from "../../../interfaces/rol";
import { AuthenticationService } from "../../../services/authentication.service";

@Component({
  selector: 'app-route-place-info',
  templateUrl: './route-place-info.component.html',
  styleUrls: ['./route-place-info.component.scss'],
})

export class RoutePlaceInfoComponent implements OnInit {
  @ViewChild('routePlaceDownload') public routePlaceDownload:ModalDirective;
  rol: Rol = {id: 0, key: "", name: ""};
  @Input() onlyIcon: any;
  @Input() routePlace: any;

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
  }
}
