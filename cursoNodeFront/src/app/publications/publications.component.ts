import { Publication } from './../models/publication';
import { PublicationService } from './../services/publication.service';
import { GLOBAL } from './../services/global';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css'],
  providers: [UserService, PublicationService]
})
export class PublicationsComponent implements OnInit {

  public identity;
  public token;
  public title: string;
  public url: string;
  public page;
  public status: string;
  public publications: Publication[];
  public total;
  public pages;
  public itemsPerPage;
  public noMore: boolean;
  @Input() user;

  constructor(private _userService: UserService,
              private _route: ActivatedRoute,
              private _router: Router,
              private _publicationService: PublicationService) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.title = 'Publications';
    this.page = 1;
    this.noMore = false;    
  }

  ngOnInit() {
    console.log('publications component cargado');
    this.getPublications(this.user, this.page);
  }

  getPublications(user, page, adding = false) {
    this._publicationService.getPublicationsUser(this.token, page, user).subscribe(
      response => {
        console.log(response);
        if (response.publications) {

          this.total = response.total;
          this.pages = response.pages;
          this.itemsPerPage = response.items_per_page;

          if (!adding) {
            this.publications = response.publications;
          } else {
            const arrayA = this.publications;
            const arrayB = response.publications;
            this.publications = arrayA.concat(arrayB);

          }

          if (this.publications.length === this.total) {
            this.noMore = true;
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

  viewMore() {
    if (this.publications.length === this.total) {
      this.noMore = true;
    } else {
      this.page += 1;
    }

    console.log(this.page);
    this.getPublications(this.user, this.page, true);
  }

}
