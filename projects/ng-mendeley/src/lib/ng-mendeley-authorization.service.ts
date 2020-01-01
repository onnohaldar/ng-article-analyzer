// Angular
import { Injectable } from '@angular/core';

// Library
import { NgMendeleyService } from './ng-mendeley.service';
interface AuthParms {
  clientId?: string;
  secret?: string;
  redirectUri?: string;
  responseType: string;
  scope: string;
  state?: string;
  accessToken?: string;
  refreshToken?: string;
  clientSecret?: string;
  tokenType?: string;
  expires?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NgMendeleyAuthorizationService {
  /**
   * Defaults Authorization Flow
   */
  private authParms: AuthParms = {
    responseType: 'code',
    scope: 'all'
  };

  constructor(private service: NgMendeleyService) { }

  get authToken() {
    return 'Bearer ' + this.authParms.accessToken;
  }

  /**
   * Start Basic Authorization Flow
   * @see <https://dev.mendeley.com/reference/topics/authorization_auth_code.html>
   * @see <https://www.oauth.com/oauth2-servers/making-authenticated-requests/refreshing-an-access-token/>
   * @see <https://en.wikipedia.org/wiki/Basic_access_authentication>
   */
  login(clientId: string, redirectUri: string, secret: string) {
    this.service.get<any>()
  }

}
