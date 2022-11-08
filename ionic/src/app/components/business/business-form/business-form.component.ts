import { Component, OnInit, Input } from '@angular/core';
import { Rol } from "../../../interfaces/rol";
import { AuthenticationService } from "../../../services/authentication.service";

@Component({
  selector: 'app-business-form',
  templateUrl: './business-form.component.html',
  styleUrls: ['./business-form.component.scss'],
})

export class BusinessFormComponent implements OnInit {
  @Input() business: any;
  @Input() enterprises: any = [];
  @Input() attentions: any = [];
  rol: Rol = {id: 0, key: "", name: ""};

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
  }
}
