import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { Rol } from "../../../interfaces/rol";
import { AuthenticationService } from "../../../services/authentication.service";

@Component({
  selector: 'app-promotion-info',
  templateUrl: './promotion-info.component.html',
  styleUrls: ['./promotion-info.component.scss'],
})
export class PromotionInfoComponent implements OnInit {
  @ViewChild('promotionDownload') public promotionDownload:ModalDirective;
  rol: Rol = {id: 0, key: "", name: ""};
  @Input() onlyIcon: any;
  @Input() promotion: any;

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
  }
}
