import { Component, OnInit, Input } from '@angular/core';
import { Rol } from "../../../interfaces/rol";
import { AuthenticationService } from "../../../services/authentication.service";
import { BusinessService } from '../../../services/business.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})

export class CategoryFormComponent implements OnInit {
  @Input() category: any;
  @Input() enterprises: any = [];
  @Input() businesses: any = [];
  rol: Rol = {id: 0, key: "", name: ""};

  constructor(
    private authenticationService: AuthenticationService,
    private businessService: BusinessService
  ) { }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
  }

  method_getBusinesses(): void {
    this.businessService.action_getBusinesses({enterprise_id: this.category.enterpriseId})
    .subscribe(
      (data) => { this.businesses = data;},
      (error) => {console.log("Error action_getBusinesses: ",error);}
    );
  }
}
