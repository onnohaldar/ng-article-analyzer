// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NgMendeleyService {
  readonly apiUrl = 'https://api.mendeley.com/';
  private authParms = {
    accessToken: '<ACCESS_TOKEN>'
  };

  constructor(private http: HttpClient) { }

  set accessToken(value: string) {
    this.authParms.accessToken = value;
  }

  buildHeaders(acceptValue: string) {
    return {
      Authorization: 'Bearer ' + this.authParms.accessToken,
      Accept: acceptValue
    };
  }

  get userRoles() {
    return this.http.get(this.apiUrl + 'user_roles',
      { headers: this.buildHeaders('application/vnd.mendeley-user-role.1+json') });
  }

}
