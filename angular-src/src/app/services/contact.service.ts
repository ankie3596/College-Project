import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class ContactService {

  user: any;

  constructor(
    private http: Http
  ) { }

  contactUser(user) {
    console.log('contact-us' , user);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/abc/contact-us', user, {headers: headers})
    .map(res => res.json());
  }
}
