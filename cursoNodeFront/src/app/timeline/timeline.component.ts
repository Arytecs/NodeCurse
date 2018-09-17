import { Publication } from './../models/publication';
import { PublicationService } from './../services/publication.service';
import { GLOBAL } from './../services/global';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
  providers: [UserService, PublicationService]
})
export class TimelineComponent implements OnInit {
  public identity;
  public token;
  public title: string;
  public url: string;
  public page;
  public status: string;
  public publications: Publication[];
  public total;
  public pages;

  constructor(private _userService: UserService,
              private _route: ActivatedRoute,
              private _router: Router,
              private _publicationService: PublicationService) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.title = 'Timeline';
    this.page = 1;
  }

  ngOnInit() {
    console.log('timeline component cargado');
    this.getPublications(this.page);
  }

  getPublications(page) {
    this._publicationService.getPublications(this.token, page).subscribe(
      response => {
        console.log(response);
        if (response.publications) {
          this.publications = response.publications;
          this.total = response.total;
          this.pages = response.pages;
          if (page > this.pages) {
            this._router.navigate(['/home']);
          }
        }
      },
      error => {
        const errorMessage = <any>error;
        if (errorMessage) {
          this.status = 'error';
        }
      }
    );
  }

}
