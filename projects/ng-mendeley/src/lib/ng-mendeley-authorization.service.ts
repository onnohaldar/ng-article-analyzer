// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// UUID
import { v4 as uuid } from 'uuid';

// Library
import { NgMendeleyConfigService } from './ng-mendeley-config.service';

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
  private authParms: AuthParms = {
    responseType: 'code',
    scope: 'all'
  };

  constructor(
    private http: HttpClient,
    private config: NgMendeleyConfigService) { }

  setAuthToken() {
    this.config.authToken = 'Bearer ' + this.authParms.accessToken;
  }

  /**
   * Start Basic Authorization Flow
   * @see <https://dev.mendeley.com/reference/topics/authorization_auth_code.html>
   * @see <https://www.oauth.com/oauth2-servers/making-authenticated-requests/refreshing-an-access-token/>
   * @see <https://en.wikipedia.org/wiki/Basic_access_authentication>
   */
  authorize(clientId: string, redirectUri: string, secret: string) {
    // preserve auth parms
    this.authParms.clientId = clientId;
    this.authParms.redirectUri = redirectUri;
    this.authParms.secret = secret;
    this.authParms.state = uuid();
    // create auth url
    return this.http.get(this.config.buildMethodEndPointUrl(this.config.authorizePath), {
    params: {
      client_id: this.authParms.clientId,
      redirect_uri: this.authParms.redirectUri,
      response_type: this.authParms.responseType,
      scope: this.authParms.scope,
      state: this.authParms.state
      },
      responseType: 'json',
      withCredentials: true
   });
  }

}
