import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from "@angular/core";
import { Subsidiary } from "../../../interfaces/subsidiary";
import { Enterprise } from "../../../interfaces/enterprise";
import { Business } from "../../../interfaces/business";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { AuthenticationService } from "../../../services/authentication.service";
import { EnterpriseService } from "../../../services/enterprise.service";
import { BusinessService } from "../../../services/business.service";
import { SubsidiaryService } from "../../../services/subsidiary.service";
import { ModalDirective } from "angular-bootstrap-md";
import Swal from "sweetalert2";
import { Rol } from "../../../interfaces/rol";

@Component({
  selector: "app-subsidiary-insert",
  templateUrl: "./subsidiary-insert.component.html",
  styleUrls: ["./subsidiary-insert.component.scss"],
})
export class SubsidiaryInsertComponent implements OnInit {
  @ViewChild("subsidiaryInsert") public subsidiaryInsert: ModalDirective;
  subsidiary: Subsidiary = {
    id: 0,
    name: "",
    is_central: false,
    logo: "",
    logoFile: null,
    overlay: "",
    overlayFile: null,
    street: "",
    exterior: "",
    interior: "",
    postal_code: "",
    neighborhood: "",
    city: "",
    municipality: "",
    state: "",
    country: "",
    references: "",
    enterpriseId: 0, 
    business_id: 0
  };
  enterprise: Enterprise = { id: 0, name: "" };
  enterprises: any = [];
  business: Business = {id: 0, name: "", enterprise_id: 0, attention_id: 0};
  businesses: any = [];
  subsidiaryForm: FormGroup;
  isLoading: boolean = false;
  @Output() emitter_insertedSubsidiary: EventEmitter<boolean> =
    new EventEmitter();
  @Input() gotSubsidiariesInInsert: boolean = false;
  rol: Rol = { id: 0, key: "", name: "" };

  constructor(
    private authenticationService: AuthenticationService,
    private enterpriseService: EnterpriseService,
    private businessService: BusinessService,
    private subsidiaryService: SubsidiaryService,
    private formBuilder: FormBuilder
  ) {
    this.subsidiaryForm = this.formBuilder.group({
      name: new FormControl("", [Validators.required]),
      is_central: new FormControl("", [Validators.required]),
      street: new FormControl("", [Validators.required]),
      exterior: new FormControl("", [Validators.required]),
      postal_code: new FormControl("", [Validators.required]),
      neighborhood: new FormControl("", [Validators.required]),
      city: new FormControl("", [Validators.required]),
      municipality: new FormControl("", [Validators.required]),
      state: new FormControl("", [Validators.required]),
      country: new FormControl("", [Validators.required]),
      business_id: new FormControl("", [Validators.required,
        Validators.min(1)]),
    });
  }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
  }
  ngOnChanges() {
    if (this.gotSubsidiariesInInsert) {
      this.emitter_insertedSubsidiary.emit(false);
    }
  }

  method_getSubsidiary() {
    this.subsidiaryInsert.show();
    this.method_getEnterprises();
    this.subsidiary = {id: 0, name: "", street: "", exterior: "", interior: "", postal_code: "", neighborhood: "", city: "", municipality: "", state: "", country: "", is_central: false, references: "", enterpriseId: 0, business_id: 0, logo: "", logoFile: null, overlay: "", overlayFile: null};    
    
    switch(this.rol.key){
      case 'Super':
      break;
      case 'Director':
        this.enterprise = this.authenticationService.localStorage_getEnterprise();
        this.subsidiary.enterpriseId = this.enterprise.id;
        this.method_getBusinesses();
      break;
      case 'Manager':
      break;
      case 'Call_Center':
      break;
      case 'Seller':
      break;
      case 'Client':
      break;
      default:
        break;
    }
  }
  method_getEnterprises(): void {
    this.enterpriseService.action_insideGetEnterprises({}).subscribe(
      (data) => {
        this.enterprises = data;
      },
      (error) => {
        console.log("Error action_getEnterprises: ", error);
      }
    );
  }
  method_getBusinesses(): void {
    this.businessService.action_getBusinesses({enterprise_id: this.subsidiary.enterpriseId})
    .subscribe(
      (data) => { this.businesses = data;},
      (error) => {console.log("Error action_getBusinesses: ",error);}
    );
  }  
  method_insertSubsidiary() {
    this.subsidiaryForm.get("name").setValue(this.subsidiary.name);
    this.subsidiaryForm.get("is_central").setValue(this.subsidiary.is_central);
    this.subsidiaryForm.get("street").setValue(this.subsidiary.street);
    this.subsidiaryForm.get("exterior").setValue(this.subsidiary.exterior);
    this.subsidiaryForm.get("postal_code").setValue(this.subsidiary.postal_code);
    this.subsidiaryForm.get("neighborhood").setValue(this.subsidiary.neighborhood);
    this.subsidiaryForm.get("city").setValue(this.subsidiary.city);
    this.subsidiaryForm.get("municipality").setValue(this.subsidiary.municipality);
    this.subsidiaryForm.get("state").setValue(this.subsidiary.state);
    this.subsidiaryForm.get("country").setValue(this.subsidiary.country);
    this.subsidiaryForm.get("business_id").setValue(this.subsidiary.business_id);
    if (this.subsidiaryForm.valid) {
      this.isLoading = true;
      this.subsidiaryService.action_insertSubsidiary(this.subsidiary).subscribe(
        (data) => {
          if (data.status == 200) {
            this.subsidiaryInsert.hide();
            this.isLoading = false;
            this.emitter_insertedSubsidiary.emit(true);
            Swal.fire("Sucursal creada", "", "success");
          } else {
            this.isLoading = false;
            Swal.fire("Sucursal no creada", "Intentalo de nuevo", "warning");
            console.log("Response action_insertSubsidiary: ", data);
          }
        },
        (error) => {
          this.isLoading = false;
          Swal.fire("Sucursal no creada", "Reporta a un superior", "error");
          console.log("Error action_insertSubsidiary: ", error);
        }
      );
    } else {
      Swal.fire("Sucursal no creada", "Completa la información", "info");
      console.log("Información formulario: ", this.subsidiaryForm);
    }
  }
}
