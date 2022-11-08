import { Component, OnInit, Input } from '@angular/core';
import { Rol } from "../../../interfaces/rol";
import { AuthenticationService } from "../../../services/authentication.service";

@Component({
  selector: 'app-external-api-form',
  templateUrl: './external-api-form.component.html',
  styleUrls: ['./external-api-form.component.scss'],
})

export class ExternalApiFormComponent implements OnInit {
  @Input() externalApi: any;
  @Input() enterprises: any = [];
  rol: Rol = {id: 0, key: "", name: ""};

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
  }
}
