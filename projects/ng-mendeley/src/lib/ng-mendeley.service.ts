// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  get<T>(method: string, returnType: string, id?: string, params?: {}) {
    return this.http.get<T>(this.buildUrl(method, id),
      { headers: {
        Authorization: this.authToken,
        Accept: 'application/vnd.mendeley-' + returnType
      },
      params });
  }

  /**
   * <https://dev.mendeley.com/methods/#retrieve-all-user-roles>
   */
  get userRoles() {
    return this.get<{ description: string }[]>('user_roles', 'user-role.1+json');
  }

}
