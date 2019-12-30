// Angular
import { Injectable } from '@angular/core';

// Libraries
import { NgMendeleyService } from './ng-mendeley.service';

/**
 * <https://dev.mendeley.com/methods/#folder-attributes>
 */
interface Folder {
  id: string;	// id of the folder
  name: string;	// name of the folder
  parent_id?: string;	// id of the parent folder
  group_id?: string;	// id of the owning group
  created: string;	// date the folder was created. This date is represented in ISO 8601 format.
  modified: string;	// date the folder was modified. This date is represented in ISO 8601 format.
}


@Injectable({
  providedIn: 'root'
})
export class NgMendeleyFoldersService {

  constructor(private service: NgMendeleyService) { }

  /**
   * Mendely API method: <https://dev.mendeley.com/methods/#list-all-folders>
   */
  listAllFolders() {
    return this.service.get<Folder[]>('folders', 'folder.1+json');
  }

}
