import { TestBed } from '@angular/core/testing';

import { NgMendeleyAuthorizationService } from './ng-mendeley-authorization.service';

describe('NgMendeleyAuthorizationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgMendeleyAuthorizationService = TestBed.get(NgMendeleyAuthorizationService);
    expect(service).toBeTruthy();
  });
});
