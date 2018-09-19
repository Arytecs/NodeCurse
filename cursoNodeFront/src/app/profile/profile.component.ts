import { Follow } from './../models/follow';
import { User } from './../models/user';
import { GLOBAL } from './../services/global';
import { FollowService } from './../services/follow.service';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserService, FollowService]
})
export class ProfileComponent implements OnInit {
  public title: string;
  public url: string;
  public user: User;
  public status: string;
  public identity;
  public token;
  public stats;
  public followed;
  public following;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _followService: FollowService) {
    this.title = 'Perfil';
    this.url = GLOBAL.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.followed = false;
    this.following = false;
  }

  ngOnInit() {
    console.log('Perfil component cargado');
    this.loadPage();
  }

  loadPage() {
    this._route.params.subscribe(params => {
      const id = params['id'];

      this.getUser(id);
      this.getCounters(id);
    });
  }

  getUser(id) {
    this._userService.getUser(id).subscribe(
      response => {
        if (response.user) {
          console.log(response);
          this.status = 'success';
          this.user = response.user;

          if (response.following) {
            this.following = true;
          } else {
            this.following = false;
          }

          if (response.followed) {
            this.followed = true;
          } else {
            this.followed = false;
          }
        }
      },
      error => {
        this.status = 'error';
        this._router.navigate(['/perfil', this.identity._id]);
      }
    );
  }

  getCounters(id) {
    this._userService.getCounters(id).subscribe(
      response => {
        console.log(response);
        this.stats = response;
        this.status = 'success';
      },
      error => {
        console.log(error);
        this.status = 'error';
      }
    );
  }

  followUser(followed) {
    const follow = new Follow('', this.identity._id, followed);
    this._followService.addFollow(this.token, follow).subscribe(
      response => {
        this.following = true;
      },
      error => {
        console.log(error);
        this.status = 'error';
      }
    );
  }

  unfollowUser(followed) {
    this._followService.deleteFollow(this.token, followed).subscribe(
      response => {
        this.following = false;
      },
      error => {
        console.log(error);
      }
    );
  }

}
