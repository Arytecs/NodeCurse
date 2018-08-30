import { UserService } from './../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from './../models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public user: User;
  public title: string;
  public status: string;
  public error: string;
  public identity;
  public token: string;

  constructor(private _route: ActivatedRoute, private _router: Router, private _userService: UserService) {
    this.title = 'Login';
    this.user = new User('', '', '', '', '', '', 'ROLE_USER', '', false);
  }

  ngOnInit() {
  }

  onSubmit() {
    this._userService.login(this.user).subscribe(
      response => {
        this.identity = response.user;
        if (!this.identity && this.identity._id) {
          this.status = 'error';
        } else {
          this.status = 'success';
          // PERSISTIR DATOS DEL USUARIO
          localStorage.setItem('identity', JSON.stringify(this.identity));

          // Conseguir el token
          this.getToken();
        }
        this.status = 'success';
      },
      error => {
        this.status = <any>error;
        const errorMessage = <any>error;
        if (errorMessage != null) {
          this.error = errorMessage.error.message;
        }
        this.status = 'error';
      });
  }

  getToken() {
    this._userService.login(this.user, true).subscribe(
      response => {
        this.token = response.token;
        if (!this.token) {
          this.status = 'error';
        } else {
          this.status = 'success';
          // PERSISTIR TOKEN DEL USUARIO
          localStorage.setItem('token', this.token);

          // Conseguir los contadores o estadísticas del usuario

        }
        this.status = 'success';
      },
      error => {
        this.status = <any>error;
        const errorMessage = <any>error;
        if (errorMessage != null) {
          this.error = errorMessage.error.message;
        }
        this.status = 'error';
      });
  }
}
