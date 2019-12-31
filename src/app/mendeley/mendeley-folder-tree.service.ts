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

interface FolderTreeNode {
  id: string;
  name: string;
  childs?: FolderTreeNode[];
}

/**
 * Checklist database, it can build a tree structured Json object.
 * Each node in Json object represents a to-do item or a category.
 * If a node is a category, it has children items and new items can be added under the category.
 */
@Injectable()
export class MendeleyFolderTreeService {
  dataChange = new BehaviorSubject<TodoItemNode[]>([]);

  get data(): TodoItemNode[] { return this.dataChange.value; }

  constructor(private service: NgMendeleyFoldersService) { }

  initialize() {
    // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
    //     file node as children.
    this.service.listAllFolders().subscribe(
      folders => {
        const topFolders = folders.filter(folder => !folder.parent_id);
        const childFolders = folders.filter(folder => folder.parent_id);
        const folderTreeNodes: FolderTreeNode[] = [];
        for (const topFolder of topFolders) {
          const folderTreeNode = this.buildFolderTreeNode(childFolders, topFolder);
          folderTreeNodes.push(folderTreeNode);
        }
        console.log('folderTreeNodes', folderTreeNodes);
      }
    );
    const data = this.buildFileTree(TREE_DATA, 0);

    // Notify the change.
    this.dataChange.next(data);
  }

  buildFolderTreeNode(childFolders: MendeleyFolder[], topFolder: MendeleyFolder): FolderTreeNode {
    const subFolders = childFolders.filter(folder => folder.parent_id === topFolder.id);
    const folderTreeNode: FolderTreeNode = { id: topFolder.id, name: topFolder.name };
    for (const subFolder of subFolders) {
      const subFolderTreeNode = this.buildFolderTreeNode(childFolders, subFolder);
      if (folderTreeNode.childs) {
        folderTreeNode.childs.push(subFolderTreeNode);
      } else {
        folderTreeNode.childs = [subFolderTreeNode];
      }
    }
    return folderTreeNode;
  }

  /**
   * Build a Tree Data Object
   */
  buildTreeData(folders: MendeleyFolder[], treeData?: FolderTreeNode): FolderTreeNode[] {
    if (treeData) {
      console.log('treeData', treeData);
      const childFolders = folders.filter(folder => folder.parent_id !== undefined && folder.parent_id === treeData.id);
      console.log('childFolders', childFolders);
      const childs: FolderTreeNode[] = [];
      if (childFolders.length > 0) {
        for (const childFolder of childFolders) {
          childs.push({ id: childFolder.id, name: childFolder.name });
        }
        return childs;
      } else {
        return treeData.childs;
      }
    } else {
      const topFolders = folders.filter(folder => !folder.parent_id);
      console.log('topFolders', topFolders);
      for (const topFolder of topFolders) {
        return this.buildTreeData(folders, { id: topFolder.id, name: topFolder.name });
      }
    }
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
  insertItem(parent: TodoItemNode, name: string) {
    if (parent.children) {
      parent.children.push({item: name} as TodoItemNode);
      this.dataChange.next(this.data);
    }
  }

  updateItem(node: TodoItemNode, name: string) {
    node.item = name;
    this.dataChange.next(this.data);
  }
}
