// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface MendeleyUserRole { description: string; }

@Injectable({
  providedIn: 'root'
})
export class NgMendeleyService {
  /**
   * Mendeley Rest Api EndPoint
   */
  readonly apiUrl = 'https://api.mendeley.com';

  /**
   * 0Auth Parameters
   * @see <https://www.oauth.com/oauth2-servers/making-authenticated-requests/refreshing-an-access-token/>
   * @see <https://dev.mendeley.com/reference/topics/authorization_auth_code.html>
   */
  private authParms: {
    accessToken?: string;
    refreshToken?: string;
    clientId?: string;
    clientSecret?: string;
    tokenType: 'bearer';
    expires?: number;
  };

  constructor(private http: HttpClient) { }

  set accessToken(value: string) { this.authParms.accessToken = value; }
  set refreshToken(value: string) { this.authParms.refreshToken = value; }
  set clientId(value: string) { this.authParms.clientId = value; }
  set clientSecret(value: string) { this.authParms.clientSecret = value; }

  buildUrl(method: string, id?: string) {
    if (id) { method += '/' + id; }
    return this.apiUrl + '/' + method;
  }

  get authToken() {
    return 'Bearer ' + this.authParms.accessToken;
  }

  /**
   * Mendeley Rest Api GET-method
   */
  get<T>(methodPath: string, returnType: string, id?: string, params?: {}) {
    return this.http.get<T>(this.buildUrl(methodPath, id),
      { headers: {
        Authorization: this.authToken,
        Accept: 'application/vnd.mendeley-' + returnType
      },
      params });
  }

  /**
   * Mendely API method
   * @see <https://dev.mendeley.com/methods/#retrieve-all-user-roles>
   */
  retrieveAllUserRoles() {
    return this.get<MendeleyUserRole[]>('user_roles', 'user-role.1+json');
  }

}
