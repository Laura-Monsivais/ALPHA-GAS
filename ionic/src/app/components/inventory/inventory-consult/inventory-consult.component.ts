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
import { InventoryService } from "../../../services/inventory.service";
@Component({
  selector: "app-inventory-consult",
  templateUrl: "./inventory-consult.component.html",
  styleUrls: ["./inventory-consult.component.scss"],
})
export class InventoryConsultComponent implements OnInit {
  rol: Rol = { id: 0, key: "", name: "" };
  @Input() inventoryId: number;
  @Input() showedInventoryInConsult: boolean = false;
  @ViewChild("inventoryInConsult") public inventoryInConsult: ModalDirective;
  inventory: any = { id: 0, subsidiaryName: "", productName: "" };
  @Output() emitter_gotInventoryInConsult: EventEmitter<boolean> =
    new EventEmitter();

  constructor(
    private authenticationService: AuthenticationService,
    private inventoryService: InventoryService
  ) {}

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
  }
  ngOnChanges() {
    if (this.showedInventoryInConsult) {
      this.method_getInventory();
      this.emitter_gotInventoryInConsult.emit(true);
    } else {
      this.emitter_gotInventoryInConsult.emit(false);
    }
  }

  method_getInventory() {
    this.inventoryInConsult.show();
    this.inventoryService
      .action_getInventories({ id: this.inventoryId })
      .subscribe(
        (data) => {
          this.inventory = data;
        },
        (error) => {
          console.log("Error action_getInventory: ", error);
        }
      );
  }
}
