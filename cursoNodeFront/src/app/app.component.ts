import { User } from "./models/user";
import { UserService } from "./services/user.service";
import { Component, OnInit, DoCheck } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { GLOBAL } from "./services/global";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck {
  public title: string;
  public identity: User;
  public url: string;

  description = "Curso de introducción a angular 5";
  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.title = "NGSOCIAL";
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this.identity = this._userService.getIdentity();
  }

  ngDoCheck() {
    this.identity = this._userService.getIdentity();
  }
  logout() {
    localStorage.clear();
    this.identity = null;
    this._router.navigate(["/"]);
  }
}
