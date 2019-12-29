// Angular
import { Injectable } from '@angular/core';

// Libraries
import { NgMendeleyService } from './ng-mendeley.service';

@Injectable({
  providedIn: 'root'
})
export class NgMendeleyDocumentsService {

  constructor(private service: NgMendeleyService) { }

  /**
   * <https://dev.mendeley.com/methods/#retrieving-documents>
   * <https://dev.mendeley.com/methods/#retrieving-a-document>
   */
  get(id?: string, params?: { view: 'bib' | 'client' | 'tags' | 'patent' | 'all' }) {
    return this.service.get('documents', 'document.1+json', id, params);
  }

}
