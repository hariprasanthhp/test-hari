import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getMyRoles() {
    return of(true);

  }

  hasValidAccessToken() {
    return true;
  }


}


