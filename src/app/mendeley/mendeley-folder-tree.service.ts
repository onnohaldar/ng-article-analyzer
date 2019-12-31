// Angular
import { Injectable } from '@angular/core';

// Rxjs
import { BehaviorSubject, Observable } from 'rxjs';

// Libraries
import { NgMendeleyFoldersService, MendeleyFolder } from 'ng-mendeley';

export class FolderTreeNode {
  id: string;
  name: string;
  children?: FolderTreeNode[];
}

export class FolderTreeFlatNode {
  id: string;
  name: string;
  level: number;
  expandable: boolean;
}

@Injectable()
export class MendeleyFolderTreeService {
  dataChange = new BehaviorSubject<FolderTreeNode[]>([]);

  get data(): FolderTreeNode[] { return this.dataChange.value; }

  constructor(private service: NgMendeleyFoldersService) { }

  initialize() {
    const params = { limit: '200' };
    this.service.listAllFolders(params).subscribe(
      folders => {
        const data = this.buildFolderTreeNodes(folders);
        console.log('folderTreeNodes', data);
        // Notify the change.
        this.dataChange.next(data);
      }
    );
  }

  buildFolderTreeNodes(folders: MendeleyFolder[]): FolderTreeNode[] {
    const topFolders = folders.filter(folder => !folder.parent_id);
    const folderTreeNodes: FolderTreeNode[] = [];
    for (const topFolder of topFolders) {
      const folderTreeNode = this.buildFolderTreeNode(folders, topFolder);
      folderTreeNodes.push(folderTreeNode);
    }
    return folderTreeNodes;
  }

  buildFolderTreeNode(folders: MendeleyFolder[], topFolder: MendeleyFolder): FolderTreeNode {
    const childFolders = folders.filter(folder => folder.parent_id === topFolder.id);
    const folderTreeNode = new FolderTreeNode();
    folderTreeNode.id = topFolder.id;
    folderTreeNode.name = topFolder.name;

    for (const childFolder of childFolders) {
      const childFolderTreeNode = this.buildFolderTreeNode(folders, childFolder);
      if (folderTreeNode.children) {
        folderTreeNode.children.push(childFolderTreeNode);
      } else {
        folderTreeNode.children = [childFolderTreeNode];
      }
    }
    return folderTreeNode;
  }

  insertItem(parent: FolderTreeNode, name: string) {
    if (parent.children) {
      parent.children.push({ name } as FolderTreeNode);
      this.dataChange.next(this.data);
    }
  }

  updateItem(node: FolderTreeNode, name: string) {
    node.name = name;
    this.dataChange.next(this.data);
  }
}
