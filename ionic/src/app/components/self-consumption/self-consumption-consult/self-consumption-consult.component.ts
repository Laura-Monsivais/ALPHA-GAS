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
import { AuthenticationService } from "../../../services/authentication.service";
import { SelfConsumptionService } from "../../../services/self-consumption.service";
@Component({
  selector: "app-self-consumption-consult",
  templateUrl: "./self-consumption-consult.component.html",
  styleUrls: ["./self-consumption-consult.component.scss"],
})
export class SelfConsumptionConsultComponent implements OnInit {
  rol: Rol = { id: 0, key: "", name: "" };
  @Input() selfconsumptionId: number;
  @Input() showedSelfconsumptionInConsult: boolean = false;
  @ViewChild("selfconsumptionConsult")
  public selfconsumptionConsult: ModalDirective;
  selfconsumption: any = { id: 0 };
  @Output() emitter_gotSelfconsumptionInConsult: EventEmitter<boolean> =
    new EventEmitter();
  constructor(
    private authenticationService: AuthenticationService,
    private selfconsumptionService: SelfConsumptionService
  ) {}
  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
  }
  ngOnChanges() {
    if (this.showedSelfconsumptionInConsult) {
      this.method_getSelfconsumption();
      this.emitter_gotSelfconsumptionInConsult.emit(true);
    } else {
      this.emitter_gotSelfconsumptionInConsult.emit(false);
    }
  }
  method_getSelfconsumption() {
    this.selfconsumptionConsult.show();
    this.selfconsumptionService
      .action_getSelfconsumptions({ id: this.selfconsumptionId })
      .subscribe(
        (data) => {
          this.selfconsumption = data;
        },
        (error) => {
          console.log("Error action_getSelfconsumption: ", error);
        }
      );
  }
}
