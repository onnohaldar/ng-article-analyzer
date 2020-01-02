// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Library
import { NgMendeleyConfigService, MendeleyUserRole } from './ng-mendeley-config.service';

@Injectable({
  providedIn: 'root'
})
export class NgMendeleyService {

  constructor(
    private http: HttpClient,
    private config: NgMendeleyConfigService
  ) { }

  buildUrl(methodPath: string, id?: string) {
    let methodEndPointUrl = this.config.apiEndPointUrl + '/' + methodPath;
    if (id) { methodEndPointUrl += '/' + id; }
    return methodEndPointUrl;
  }

  /**
   * Mendeley Rest Api: GET-method
   */
  get<T>(methodPath: string, accept?: string, id?: string, params?: {}) {
    return this.http.get<T>(this.buildUrl(methodPath, id),
      { headers: {
        Authorization: this.config.authToken,
        Accept: accept
      },
      params });
  }

  /**
   * Mendely API method: <https://dev.mendeley.com/methods/#retrieve-all-user-roles>
   */
  retrieveAllUserRoles() {
    return this.get<MendeleyUserRole[]>(this.config.userRolesPath, this.config.userRoleAccept);
  }

}
