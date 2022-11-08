import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { Rol } from "../../../interfaces/rol";
import { AuthenticationService } from "../../../services/authentication.service";
import { SubsidiaryService } from '../../../services/subsidiary.service';
import Swal from "sweetalert2";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-subsidiary-overlay',
  templateUrl: './subsidiary-overlay.component.html',
  styleUrls: ['./subsidiary-overlay.component.scss'],
})

export class SubsidiaryOverlayComponent implements OnInit {
  @ViewChild('subsidiaryOverlayDownload') public subsidiaryOverlayDownload:ModalDirective;
  rol: Rol = {id: 0, key: "", name: ""};
  @Input() subsidiaryOverlay: string;
  @Input() subsidiaryOverlayFile: any;
  getSubsidiaryOverlayUrl: string;
  getSubsidiaryOverlayFileUrl: string;
  isPreview: boolean = false;
  isLoading: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private subsidiaryService: SubsidiaryService,
    private sanitizer:DomSanitizer
  ) { }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
    this.getSubsidiaryOverlayUrl = this.subsidiaryService.action_getSubsidiaryOverlay(this.subsidiaryOverlay);
  }
  ngOnChanges() {
    this.getSubsidiaryOverlayUrl = this.subsidiaryService.action_getSubsidiaryOverlay(this.subsidiaryOverlay);    
    if (this.subsidiaryOverlayFile !== null) {
      if(this.subsidiaryOverlayFile.type === "image/png" || this.subsidiaryOverlayFile.type === "image/jpeg") {
        this.getSubsidiaryOverlayFileUrl = (window.URL || window.webkitURL).createObjectURL(this.subsidiaryOverlayFile);
        this.isPreview = true;
      } else {
        this.isPreview = false;
      }
    } else {
      this.isPreview = false;
    }
  }
  
  method_downloadSubsidiaryOverlay() {
    this.isLoading = true;
    this.subsidiaryService.action_downloadSubsidiaryOverlay({overlay: this.subsidiaryOverlay})
    .subscribe(
      (data) => { 
        var url = (window.URL || window.webkitURL).createObjectURL(data);
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.href = url;
        a.download = this.subsidiaryOverlay;
        a.click();
        window.URL.revokeObjectURL(url);
        this.subsidiaryOverlayDownload.hide();
        this.isLoading = false;        
      },
      (error) => {
        this.isLoading = false;
        Swal.fire("Overlay del usuario no descargado","Reporta a un superior",'error');
        console.log("Error action_downloadSubsidiaryOverlay: ",error);
      }
    );
  }
  method_sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
