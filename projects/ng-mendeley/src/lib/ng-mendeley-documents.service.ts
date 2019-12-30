// Angular
import { Injectable } from '@angular/core';

// Libraries
import { NgMendeleyService } from './ng-mendeley.service';

interface DocumentParams { view: 'bib' | 'client' | 'tags' | 'patent' | 'all'; }

interface Document {
  id: string;               // UUID of the document. Is set by the server on create.
  title: string;            // Title of the document (required).
  type: string;             // Document type
  profile_id: string;		    // Profile UUID of the Mendeley user that added the document to the system.
  group_id: string;		      // Group UUID that the document belongs to.
  created: string;		      // Date the document was added (ISO 8601 format).
  last_modified: string;  	// Date in which the document was last modified (ISO 8601 format).
  abstract: string;         // Brief summary of the document.
  source: string;           // Publication outlet, i.e. where the document was published.
  year:	number;         		// Year in which the document was issued/published.
  authors: { first_name: string; last_name: string; }[];
  identifiers: { [identifier: string]: string; };
  keywords: string[];       // List of author-supplied keywords for the document.
}

@Injectable({
  providedIn: 'root'
})
export class NgMendeleyDocumentsService {

  constructor(private service: NgMendeleyService) { }

  private get<T extends Document | Document[]>(id?: string, params?: DocumentParams) {
    return this.service.get<T>('documents', 'document.1+json', id, params);
  }

  /**
   * Mendely API method: <https://dev.mendeley.com/methods/#retrieving-documents>
   */
  retrieveDocuments(params?: DocumentParams) {
    return this.get<Document[]>(undefined, params);
  }

  /**
   * Mendely API method: <https://dev.mendeley.com/methods/#retrieving-a-document>
   */
  retrieveADocument(id: string, params?: DocumentParams) {
    return this.get<Document>(id, params);
  }

}
