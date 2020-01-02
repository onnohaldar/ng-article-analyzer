// Angular
import { Injectable } from '@angular/core';

// Libraries
import { NgMendeleyConfigService } from './ng-mendeley-config.service';
import { NgMendeleyService } from './ng-mendeley.service';

/**
 * <https://dev.mendeley.com/methods/#folder-attributes>
 */
export interface MendeleyFolder {
  id: string;	// id of the folder
  name: string;	// name of the folder
  parent_id?: string;	// id of the parent folder
  group_id?: string;	// id of the owning group
  created: string;	// date the folder was created. This date is represented in ISO 8601 format.
  modified: string;	// date the folder was modified. This date is represented in ISO 8601 format.
}
interface MendeleyFoldersParams {
  group_id?: string; // returns all folders in a particular group
  limit?: string;    // maximum number of entries to be returned
}

@Injectable({
  providedIn: 'root'
})
export class NgMendeleyFoldersService {

  constructor(
    private config: NgMendeleyConfigService,
    private service: NgMendeleyService) { }

  /**
   * Mendely API method: <https://dev.mendeley.com/methods/#list-all-folders>
   */
  listAllFolders(params?: MendeleyFoldersParams) {
    return this.service.get<MendeleyFolder[]>(this.config.foldersPath, this.config.folderAccept, undefined, params);
  }

}
