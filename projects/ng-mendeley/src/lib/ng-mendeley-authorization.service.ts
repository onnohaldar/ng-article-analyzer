// Angular
import { Injectable } from '@angular/core';

// Library
import { NgMendeleyService } from './ng-mendeley.service';

@Injectable({
  providedIn: 'root'
})
export class NgMendeleyAuthorizationService {
  /**
   * 0Auth Parameters
   * @see <https://www.oauth.com/oauth2-servers/making-authenticated-requests/refreshing-an-access-token/>
   * @see <https://dev.mendeley.com/reference/topics/authorization_auth_code.html>
   */
  private authParms = {
    redirectUri: undefined,
    accessToken: undefined,
    refreshToken: undefined,
    clientId: undefined,
    clientSecret: undefined,
    tokenType: 'bearer',
    expires: undefined
  };

  constructor(private service: NgMendeleyService) { }

  set accessToken(value: string) { this.authParms.accessToken = value; }
  set refreshToken(value: string) { this.authParms.refreshToken = value; }
  set clientId(value: string) { this.authParms.clientId = value; }
  set clientSecret(value: string) { this.authParms.clientSecret = value; }

  get authToken() {
    return 'Bearer ' + this.authParms.accessToken;
  }

}
