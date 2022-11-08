import {
  Component,
  OnInit,
  Input,
  ViewChild,
  Output,
  EventEmitter,
} from "@angular/core";
import { Rol } from "../../../interfaces/rol";
import { ModalDirective } from "angular-bootstrap-md";
import { Subsidiary } from "../../../interfaces/subsidiary";
import { Business } from "../../../interfaces/business";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { AuthenticationService } from "../../../services/authentication.service";
import { EnterpriseService } from "../../../services/enterprise.service";
import { SubsidiaryService } from "../../../services/subsidiary.service";
import { BusinessService } from "../../../services/business.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-subsidiary-update",
  templateUrl: "./subsidiary-update.component.html",
  styleUrls: ["./subsidiary-update.component.scss"],
})
export class SubsidiaryUpdateComponent implements OnInit {
  rol: Rol = { id: 0, key: "", name: "" };
  @Input() subsidiaryId: number;
  @Input() showedSubsidiaryInUpdate: boolean = false;
  @ViewChild('subsidiaryUpdate') public subsidiaryUpdate:ModalDirective;
  subsidiary: Subsidiary = {id: 0, name: "", street: "", exterior: "", interior: "", postal_code: "", neighborhood: "", city: "", municipality: "", state: "", country: "", is_central: true, references: "", enterpriseId: 0, business_id: 0, logo: "", logoFile: null, overlay: "", overlayFile: null};
  getSubsidiaryLogoUrl: string;
  getSubsidiaryOverlayUrl: string;
  enterprises: any = [];
  businesses: any = [];
  business: Business = { id: 0, name: "", enterprise_id: 0, attention_id: 0 };
  subsidiaryForm: FormGroup;
  isLoading: boolean = false;
  @Output() emitter_updatedSubsidiary: EventEmitter<boolean> =
    new EventEmitter();
  @Input() gotSubsidiariesInUpdate: boolean = false;
  @Output() emitter_gotSubsidiaryInUpdate: EventEmitter<boolean> =
    new EventEmitter();

  constructor(
    private authenticationService: AuthenticationService,
    private enterpriseService: EnterpriseService,
    private subsidiaryService: SubsidiaryService,
    private businessService: BusinessService,
    private formBuilder: FormBuilder
  ) {
    this.subsidiaryForm = this.formBuilder.group({
      id: new FormControl("", [Validators.required,
        Validators.min(1)]),
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
    this.subsidiary.id = this.subsidiaryId;
  }
  ngOnChanges() {
    if (this.showedSubsidiaryInUpdate) {
      this.method_getSubsidiary();
      this.emitter_gotSubsidiaryInUpdate.emit(true);
    } else {
      this.emitter_gotSubsidiaryInUpdate.emit(false);
    }
    if (this.gotSubsidiariesInUpdate) {
      this.emitter_updatedSubsidiary.emit(false);
    }
  }

  method_getSubsidiary(): void {
    this.subsidiaryUpdate.show();
    this.method_getEnterprises();
    this.subsidiaryService.action_getSubsidiaries({id: this.subsidiaryId})
    .subscribe(
      (data) => { 
        this.subsidiary = data;
        this.method_getBusinesses();
      },
      (error) => {console.log("Error action_getSubsidiary: ",error);}
    );
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
  method_updateSubsidiary() {
    this.subsidiaryForm.get("id").setValue(this.subsidiary.id);
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
      this.subsidiaryService.action_updateSubsidiary(this.subsidiary).subscribe(
        (data) => {
          if (data.status == 200) {
            this.subsidiaryUpdate.hide();
            this.isLoading = false;
            this.emitter_updatedSubsidiary.emit(true);
            Swal.fire("Sucursal modificada", "", "success");
          } else {
            this.isLoading = false;
            Swal.fire(
              "Sucursal no modificada",
              "Intentalo de nuevo",
              "warning"
            );
            console.log("Response action_updateSubsidiary: ", data.message);
          }
        },
        (error) => {
          this.isLoading = false;
          Swal.fire("Sucursal no modificada", "Reporta a sistemas", "error");
          console.log("Error action_updateSubsidiary: ", error);
        }
      );
    } else {
      Swal.fire("Sucursal no modificada", "Completa la información", "info");
      console.log("Información formulario: ", this.subsidiaryForm);
    }
  }
}
