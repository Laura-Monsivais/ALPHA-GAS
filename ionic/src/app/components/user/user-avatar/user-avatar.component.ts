import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { Rol } from "../../../interfaces/rol";
import { AuthenticationService } from "../../../services/authentication.service";
import { UserService } from '../../../services/user.service';
import Swal from "sweetalert2";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss'],
})

export class UserAvatarComponent implements OnInit {
  @ViewChild('userAvatarDownload') public userAvatarDownload:ModalDirective;
  rol: Rol = {id: 0, key: "", name: ""};
  @Input() userAvatar: string;
  @Input() userAvatarFile: any;
  getUserAvatarUrl: string;
  getUserAvatarFileUrl: string;
  isPreview: boolean = false;
  isLoading: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private sanitizer:DomSanitizer
  ) { }

  ngOnInit() {
    this.rol = this.authenticationService.localStorage_getRol();
    this.getUserAvatarUrl = this.userService.action_getUserAvatar(this.userAvatar);
  }
  ngOnChanges() {
    this.getUserAvatarUrl = this.userService.action_getUserAvatar(this.userAvatar);    
    if (this.userAvatarFile !== null) {
      if(this.userAvatarFile.type === "image/png" || this.userAvatarFile.type === "image/jpeg") {
        this.getUserAvatarFileUrl = (window.URL || window.webkitURL).createObjectURL(this.userAvatarFile);
        this.isPreview = true;
      } else {
        this.isPreview = false;
      }
    } else {
      this.isPreview = false;
    }
  }
  
  method_downloadUserAvatar() {
    this.isLoading = true;
    this.userService.action_downloadUserAvatar({avatar: this.userAvatar})
    .subscribe(
      (data) => { 
        var url = (window.URL || window.webkitURL).createObjectURL(data);
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.href = url;
        a.download = this.userAvatar;
        a.click();
        window.URL.revokeObjectURL(url);
        this.userAvatarDownload.hide();
        this.isLoading = false;        
      },
      (error) => {
        this.isLoading = false;
        Swal.fire("Avatar del usuario no descargado","Reporta a un superior",'error');
        console.log("Error action_downloadUserAvatar: ",error);
      }
    );
  }
  method_sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
