import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { FetchedUser } from '../models/user.model';

@Injectable( { providedIn: 'root' } )
export class UserService {
  constructor( private http: HttpClient ) { }
  fetchUsers() {
    return this.http
      .get< FetchedUser[] >(environment.API_BASE_URL + '/users');
  }
}