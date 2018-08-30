import { User } from './models/user';
import { UserService } from './services/user.service';
import { Component, OnInit, DoCheck } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck {
  public title: string;
  public identity: User;
  description = 'Curso de introducción a angular 5';
  constructor(private _userService: UserService) {
    this.title = 'NGSOCIAL';
  }

  ngOnInit() {
    this.identity = this._userService.getIdentity();
  }

  ngDoCheck() {
    this.identity = this._userService.getIdentity();
  }
}
