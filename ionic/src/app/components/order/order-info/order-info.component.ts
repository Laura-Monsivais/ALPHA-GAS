import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { Rol } from "../../../interfaces/rol";
import { AuthenticationService } from "../../../services/authentication.service";

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.scss'],
})

export class OrderInfoComponent implements OnInit {
  @ViewChild('orderDownload') public orderDownload:ModalDirective;
  rol: Rol = {id: 0, key: "", name: ""};
  @Input() onlyIcon: any;
  @Input() order: any;

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
  }

}
