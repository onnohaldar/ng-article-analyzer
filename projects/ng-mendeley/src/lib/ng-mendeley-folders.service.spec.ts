import { TestBed } from '@angular/core/testing';

import { NgMendeleyFoldersService } from './ng-mendeley-folders.service';

describe('NgMendeleyFoldersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgMendeleyFoldersService = TestBed.get(NgMendeleyFoldersService);
    expect(service).toBeTruthy();
  });
});
