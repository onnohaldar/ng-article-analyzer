import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NgMendeleyConfigService {
  readonly apiEndPointUrl = 'https://api.mendeley.com';
  readonly userRolesPath = 'user_roles';
  readonly userRoleAccept = 'user-role.1+json';

  constructor() { }
}
