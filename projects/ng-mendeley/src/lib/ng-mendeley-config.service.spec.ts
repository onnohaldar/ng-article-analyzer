import { TestBed } from '@angular/core/testing';

import { NgMendeleyConfigService } from './ng-mendeley-config.service';

describe('NgMendeleyConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgMendeleyConfigService = TestBed.get(NgMendeleyConfigService);
    expect(service).toBeTruthy();
  });
});
