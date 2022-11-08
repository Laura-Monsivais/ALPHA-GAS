import { Component, OnInit, Input } from "@angular/core";
import { AuthenticationService } from "../../../services/authentication.service";
import { Rol } from "../../../interfaces/rol";

@Component({
  selector: 'app-enterprise-form',
  templateUrl: './enterprise-form.component.html',
  styleUrls: ['./enterprise-form.component.scss'],
})
export class EnterpriseFormComponent implements OnInit {
  @Input() enterprise: any;
  rol: Rol = {id: 0, key: "", name: ""};

  constructor(
    private authenticationService: AuthenticationService
  ) {
  }
  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
  }
  methods_getLogoFile(event) {
    this.enterprise.logoFile = event.target.files[0];
  }
  methods_getOverlayFile(event) {
    this.enterprise.overlayFile = event.target.files[0];
  }
}
