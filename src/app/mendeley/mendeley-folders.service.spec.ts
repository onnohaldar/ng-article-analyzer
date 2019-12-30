import { TestBed } from '@angular/core/testing';

import { MendeleyFoldersService } from './mendeley-folders.service';

describe('MendeleyFoldersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MendeleyFoldersService = TestBed.get(MendeleyFoldersService);
    expect(service).toBeTruthy();
  });
});
