import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { UserService } from "../services/user.service";
import { User } from "../models/user";
import { GLOBAL } from "../services/global";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
  providers: [UserService]
})
export class UsersComponent implements OnInit {
  public title: string;
  public identity;
  public token;
  public page;
  public nextPage;
  public prevPage;
  public status: string;
  public total;
  public pages;
  public users: User[];
  public url: string;
  public follows;
  public followUserOver;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.title = "Probando componente";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this.actualPage();
  }

  actualPage() {
    this._route.params.subscribe(params => {
      let page = +params["page"];
      this.page = page;

      if (!params["page"]) {
        page = 1;
        this.page = page;
      }

      if (!page) {
        page = 1;
      } else {
        this.nextPage = page + 1;
        this.prevPage = page - 1;

        if (this.prevPage <= 0) {
          this.prevPage = 1;
        }
      }

      // Devolver listado de usuarios
      this.getUsers(page);
    });
  }

  getUsers(page) {
    this._userService.getUsers(page).subscribe(
      response => {
        if (!response.users) {
          this.status = "error";
        } else {
          console.log(response);
          this.total = response.total;
          this.users = response.users;
          this.pages = response.pages;
          this.follows = response.users_following;
          if (page > response.pages) {
            this._router.navigate(["/gente", 1]);
          }
        }
      },
      error => {
        const errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = "error";
        }
      }
    );
  }

  mouseEnter(user_id) {
    this.followUserOver = user_id;
  }
  mouseLeave(user_id) {
    this.followUserOver = 0;
  }
}
