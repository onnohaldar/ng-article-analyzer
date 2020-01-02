// Angular
import { Injectable } from '@angular/core';

// Library
export interface AuthParms {
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

export interface MendeleyUserRole { description: string; }

@Injectable({
  providedIn: 'root'
})
export class NgMendeleyConfigService {
  readonly apiEndPointUrl = 'https://api.mendeley.com';
  readonly oauthPath = 'oauth';
  readonly authorizePath = this.oauthPath + '/' + 'authorize';
  readonly tokenPath = this.oauthPath + '/' + 'token';

  readonly userRolesPath = 'user_roles';
  readonly userRoleAccept = 'user-role.1+json';

  readonly documentPath = 'documents';
  readonly documentAccept = 'application/vnd.mendeley-document.1+json';

  readonly foldersPath = 'folders';
  readonly folderAccept = 'application/vnd.mendeley-folder.1+json';

  authToken?: string;

  constructor() { }
}
