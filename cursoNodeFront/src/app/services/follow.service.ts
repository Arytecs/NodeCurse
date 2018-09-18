import { Follow } from './../models/follow';
import { getTestBed } from '@angular/core/testing';
import { GLOBAL } from './global';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class FollowService {
  public url: string;
  public stats;

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  addFollow(token, follow): Observable<any> {
    const params = JSON.stringify(follow);
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);
    return this._http.post(this.url + 'follow', params, { headers: headers });
  }
  deleteFollow(token, id): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);
    console.log(this.url);
    return this._http.delete(this.url + 'unfollow/' + id, { headers: headers });
  }
}
