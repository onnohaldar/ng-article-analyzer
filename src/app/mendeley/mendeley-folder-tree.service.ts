// Angular
import { Injectable } from '@angular/core';

// Rxjs
import { BehaviorSubject, Observable } from 'rxjs';

// Libraries
import { NgMendeleyFoldersService, MendeleyFolder } from 'ng-mendeley';

/**
 * Node for to-do item
 */
export class TodoItemNode {
  children: TodoItemNode[];
  item: string;
}

/** Flat to-do item node with expandable and level information */
export class TodoItemFlatNode {
  item: string;
  level: number;
  expandable: boolean;
}

/**
 * The Json object for to-do list data.
 */
const TREE_DATA = {
  Groceries: {
    'Almond Meal flour': null,
    'Organic eggs': null,
    'Protein Powder': null,
    Fruits: {
      Apple: null,
      Berries: ['Blueberry', 'Raspberry'],
      Orange: null
    }
  },
  Reminders: [
    'Cook dinner',
    'Read the Material Design spec',
    'Upgrade Application to Angular'
  ]
};

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


/**
 * Checklist database, it can build a tree structured Json object.
 * Each node in Json object represents a to-do item or a category.
 * If a node is a category, it has children items and new items can be added under the category.
 */
@Injectable()
export class MendeleyFolderTreeService {
  dataChange = new BehaviorSubject<FolderTreeNode[]>([]);

  get data(): FolderTreeNode[] { return this.dataChange.value; }

  constructor(private service: NgMendeleyFoldersService) { }

  initialize() {
    // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
    //     file node as children.
    const params = { limit: '200' };
    this.service.listAllFolders(params).subscribe(
      folders => {
        console.log('params', params);
        console.log('folders', folders);
        const data = this.buildFolderTreeNodes(folders);
        console.log('folderTreeNodes', data);
        // Notify the change.
        this.dataChange.next(data);
      }
    );
    // const data = this.buildFileTree(TREE_DATA, 0);
  }

  buildFolderTreeNodes(folders: MendeleyFolder[]): FolderTreeNode[] {
    const topFolders = folders.filter(folder => !folder.parent_id);
    const folderTreeNodes: FolderTreeNode[] = [];
    for (const topFolder of topFolders) {
      const folderTreeNode = this.buildFolderTreeNode(folders, topFolder);
      console.log('folderTreeNode', folderTreeNode);
      folderTreeNodes.push(folderTreeNode);
    }
    return folderTreeNodes;
  }

  buildFolderTreeNode(folders: MendeleyFolder[], topFolder: MendeleyFolder): FolderTreeNode {
    console.log('topFolder', topFolder);
    const childFolders = folders.filter(folder => folder.parent_id === topFolder.id);
    console.log('childFolders', childFolders);
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

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `TodoItemNode`.
   */
  buildFileTree(obj: {[key: string]: any}, level: number): TodoItemNode[] {
    return Object.keys(obj).reduce<TodoItemNode[]>((accumulator, key) => {
      const value = obj[key];
      const node = new TodoItemNode();
      node.item = key;

      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          node.item = value;
        }
      }

      return accumulator.concat(node);
    }, []);
  }

  /** Add an item to to-do list */
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
