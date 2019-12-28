import { TestBed } from '@angular/core/testing';

import { NgMendeleyService } from './ng-mendeley.service';

describe('NgMendeleyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgMendeleyService = TestBed.get(NgMendeleyService);
    expect(service).toBeTruthy();
  });
});
