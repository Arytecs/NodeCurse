import { PublicationService } from './../services/publication.service';
import { Publication } from './../models/publication';
import { GLOBAL } from './../services/global';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [UserService]
})
export class SidebarComponent implements OnInit {
  public identity;
  public token;
  public stats;
  public url;
  public status;
  public publication: Publication;
  public filesToUpload: Array<File>;

  @Output() sended = new EventEmitter();

  constructor(
    private _userService: UserService,
    private _publicationService: PublicationService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.stats = this._userService.getStats();
    this.url = GLOBAL.url;
    this.publication = new Publication('', '', '', this.identity._id, '');
  }

  ngOnInit() {}

  onSubmit(form) {
    console.log(this.publication);
    this._publicationService
      .addPublication(this.token, this.publication)
      .subscribe(
        response => {
          if (response.publication) {
            this.status = 'success';
            form.reset();
            this._router.navigate(['/timeline']);

            this.publication = response.publication;
            this.publication.file = this.filesToUpload[0];
            // Subir imagen
            this.uploadImage();
          } else {
            this.status = 'error';
          }
        },
        error => {
          console.log(error);
          const errorMessage = <any>error;
          if (errorMessage !== null) {
            this.status = 'error';
          }
        }
      );
  }

  sendPublication(event) {
    console.log(event);
    this.sended.emit(JSON.stringify({ send: 'true' }));
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload);
  }

  uploadImage() {
    this._publicationService.uploadImage(this.token, this.publication).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }
}
