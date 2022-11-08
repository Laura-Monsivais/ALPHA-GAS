import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { Rol } from "../../../interfaces/rol";
import { AuthenticationService } from "../../../services/authentication.service";

@Component({
  selector: 'app-session-info',
  templateUrl: './session-info.component.html',
  styleUrls: ['./session-info.component.scss'],
})

export class SessionInfoComponent implements OnInit {
  @ViewChild('sessionDownload') public sessionDownload:ModalDirective;
  rol: Rol = {id: 0, key: "", name: ""};
  @Input() onlyIcon: any;
  @Input() session: any;

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
  }
}
