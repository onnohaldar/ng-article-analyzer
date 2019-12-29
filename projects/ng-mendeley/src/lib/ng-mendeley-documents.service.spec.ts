import { TestBed } from '@angular/core/testing';

import { NgMendeleyDocumentsService } from './ng-mendeley-documents.service';

describe('NgMendeleyDocumentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgMendeleyDocumentsService = TestBed.get(NgMendeleyDocumentsService);
    expect(service).toBeTruthy();
  });
});
