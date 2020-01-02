// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Library
import { NgMendeleyAuthorizationService } from './ng-mendeley-authorization.service';
export interface MendeleyUserRole { description: string; }

@Injectable({
  providedIn: 'root'
})
export class NgMendeleyService {
  private readonly apiUrl = 'https://api.mendeley.com';
  private readonly userRolesPath = 'user_roles';
  private readonly userRoleAccept = 'user-role.1+json';

  constructor(
    private http: HttpClient,
    private authorizationService: NgMendeleyAuthorizationService
  ) { }

  buildUrl(method: string, id?: string) {
    if (id) { method += '/' + id; }
    return this.apiUrl + '/' + method;
  }

  /**
   * Mendeley Rest Api: GET-method
   */
  get<T>(methodPath: string, accept?: string, id?: string, params?: {}) {
    return this.http.get<T>(this.buildUrl(methodPath, id),
      { headers: {
        Authorization: this.authorizationService.authToken,
        Accept: accept
      },
      params });
  }

  /**
   * Mendely API method: <https://dev.mendeley.com/methods/#retrieve-all-user-roles>
   */
  retrieveAllUserRoles() {
    return this.get<MendeleyUserRole[]>(this.userRolesPath, this.userRoleAccept);
  }

}
