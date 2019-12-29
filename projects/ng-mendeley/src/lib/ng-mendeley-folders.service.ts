// Angular
import { Injectable } from '@angular/core';

// Libraries
import { NgMendeleyService } from './ng-mendeley.service';

@Injectable({
  providedIn: 'root'
})
export class NgMendeleyFoldersService {

  constructor(private service: NgMendeleyService) { }

  /**
   * <https://dev.mendeley.com/methods/#folder-attributes>
   */
  get() {
    return this.service.get<{
      id: string;	// id of the folder
      name: string;	// name of the folder
      parent_id: string;	// id of the parent folder
      group_id: string;	// id of the owning group
      created: string;	// date the folder was created. This date is represented in ISO 8601 format.
      modified: string;	// date the folder was modified. This date is represented in ISO 8601 format.
    }[]>('folders', 'folder.1+json');
  }

}
