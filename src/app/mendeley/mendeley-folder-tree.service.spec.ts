import { TestBed } from '@angular/core/testing';

import { MendeleyFolderTreeService } from './mendeley-folder-tree.service';

describe('MendeleyFolderTreeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MendeleyFolderTreeService = TestBed.get(MendeleyFolderTreeService);
    expect(service).toBeTruthy();
  });
});
