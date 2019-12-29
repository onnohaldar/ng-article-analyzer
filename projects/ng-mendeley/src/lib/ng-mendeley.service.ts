// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NgMendeleyService {
  readonly apiUrl = 'https://api.mendeley.com';
  private authParms = {
    accessToken: '<ACCESS_TOKEN>'
  };

  constructor(private http: HttpClient) { }

  set accessToken(value: string) {
    this.authParms.accessToken = value;
  }

  buildUrl(method: string, id?: string) {
    if (id) { method += '/' + id; }
    return this.apiUrl + '/' + method;
  }

  get authToken() {
    return 'Bearer ' + this.authParms.accessToken;
  }

  get(method: string, returnType: string, id?: string, params?: HttpParams) {
    return this.http.get(this.buildUrl(method),
      { headers: {
        Authorization: this.authToken,
        Accept: 'application/vnd.mendeley-' + returnType
      },
      params });
  }

  get userRoles() {
    return this.get('user_roles', 'user-role.1+json');
  }

}
