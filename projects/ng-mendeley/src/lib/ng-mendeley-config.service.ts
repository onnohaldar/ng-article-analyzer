// Angular
import { Injectable } from '@angular/core';

// Library


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

  readonly documentsPath = 'documents';
  readonly documentAccept = 'application/vnd.mendeley-document.1+json';

  readonly foldersPath = 'folders';
  readonly folderAccept = 'application/vnd.mendeley-folder.1+json';

  authToken?: string;

  constructor() { }

  buildMethodEndPointUrl(methodPath: string, id?: string) {
    let methodEndPointUrl = this.apiEndPointUrl + '/' + methodPath;
    if (id) { methodEndPointUrl += '/' + id; }
    return methodEndPointUrl;
  }

}
