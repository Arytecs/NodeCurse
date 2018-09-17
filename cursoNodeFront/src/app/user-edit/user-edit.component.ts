import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { GLOBAL } from '../services/global';
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {
  public title: string;
  public user: User;
  public identity;
  public token;
  public status: string;
  public url;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.title = 'Actualizar mis datos';
    this.user = this._userService.getIdentity();
    this.identity = this.user;
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
  }

  onSubmit() {
    this._userService.updateUser(this.user).subscribe(
      response => {
        if (response.user) {
          this.identity = response.user;
          localStorage.setItem('identity', JSON.stringify(this.identity));
          this.status = 'success';

          // SUBIDA DE IMAGEN DE USUARIO
        } else {
          this.status = 'error';
        }
      },
      error => {
        if (error) {
          this.status = 'error';
        }
      }
    );
  }

  uploadImage(files: FileList) {
    this.user.image = files.item(0);
    this._userService.uploadImage(this.user).subscribe(
      response => {
        this.user = response.user;
        localStorage.setItem('identity', JSON.stringify(this.user));
      },
      error => {
        if (error) {
          this.status = 'error';
        }
      }
    );
  }
}
