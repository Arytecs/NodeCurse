import { UserService } from "./../services/user.service";
import { User } from "./../models/user";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  public user: User;
  public title: string;
  public error: string;
  public status: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.user = new User("", "", "", "", "", "", "ROLE_USER", null, false);
    this.title = "Registro";
  }

  ngOnInit() {}

  onSubmit(registerForm) {
    this._userService.register(this.user).subscribe(
      response => {
        if (response.user && response.user._id) {
          this.status = "success";
          registerForm.reset();
        } else {
          this.error = response.message;
          this.status = "error";
        }
      },
      error => {
        console.log(<any>error);
        this.status = "error";
        this.error = error;
      }
    );
  }
}
