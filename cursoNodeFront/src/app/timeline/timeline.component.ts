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
  public itemsPerPage;
  public noMore: boolean;

  constructor(private _userService: UserService,
              private _route: ActivatedRoute,
              private _router: Router,
              private _publicationService: PublicationService) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.title = 'Timeline';
    this.page = 1;
    this.noMore = false;
  }

  ngOnInit() {
    console.log('timeline component cargado');
    this.getPublications(this.page);
  }

  getPublications(page, adding = false) {
    this._publicationService.getPublications(this.token, page).subscribe(
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

          // if (page > this.pages) {
          //   this._router.navigate(['/home']);
          // }
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
    this.page += 1;
    if (this.page === this.pages) {
      this.noMore = true;
    }

    this.getPublications(this.page, true);
  }

  refresh(event) {
    this.getPublications(1);
  }

}
