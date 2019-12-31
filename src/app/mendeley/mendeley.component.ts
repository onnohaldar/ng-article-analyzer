// Angular
import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

// Libraries
import { NgMendeleyService, NgMendeleyDocumentsService, NgMendeleyFoldersService } from 'ng-mendeley';

// Application
import { MendeleyFolderTreeService, FolderTreeNode, FolderTreeFlatNode } from './mendeley-folder-tree.service';

@Component({
  selector: 'app-mendeley',
  templateUrl: './mendeley.component.html',
  styleUrls: ['./mendeley.component.scss']
})
export class MendeleyComponent implements OnInit {
  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<FolderTreeFlatNode, FolderTreeNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<FolderTreeNode, FolderTreeFlatNode>();

  /** A selected parent node to be inserted */
  selectedParent: FolderTreeFlatNode | null = null;

  /** The new item's name */
  newItemName = '';

  treeControl: FlatTreeControl<FolderTreeFlatNode>;

  treeFlattener: MatTreeFlattener<FolderTreeNode, FolderTreeFlatNode>;

  dataSource: MatTreeFlatDataSource<FolderTreeNode, FolderTreeFlatNode>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<FolderTreeFlatNode>(true /* multiple */);

  constructor(
    private service: NgMendeleyService,
    private documentsService: NgMendeleyDocumentsService,
    private foldersService: NgMendeleyFoldersService,
    private folderTreeService: MendeleyFolderTreeService) {
      this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
        this.isExpandable, this.getChildren);
      this.treeControl = new FlatTreeControl<FolderTreeFlatNode>(this.getLevel, this.isExpandable);
      this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  
      folderTreeService.dataChange.subscribe(data => {
        this.dataSource.data = data;
      });
    }

  ngOnInit() {
    this.service.accessToken = 'MSwxNTc3ODEwNTI2MDA2LDU2MTMxMjY3MSwxMDI4LGFsbCwsLGRhNzk0MWU3NDEzYjA2NGY1ODNiMmY5OWEwMGQzNDUyMzRhNGd4cnFiLGYxZTRlZTM4LWEyZjUtMzQ2Yy04YTViLWExNzE1MjYwOThkMCx1T0poM2E1bHppMGV5RmRHWU4zTXRqTWYzMzA';
    this.service.retrieveAllUserRoles().subscribe(
      roles => console.log(roles),
      error => console.log(error),
      () => console.log('retrieveAllUserRoles done!')
    );
    this.documentsService.retrieveADocument('877458db-9425-3cbc-8daf-2574ea07f162').subscribe(
      doc => console.log(doc.title),
      error => console.log(error),
      () => console.log('retrieveADocument done!')
    );
    this.folderTreeService.initialize();
  }

  getLevel = (node: FolderTreeFlatNode) => node.level;

  isExpandable = (node: FolderTreeFlatNode) => node.expandable;

  getChildren = (node: FolderTreeNode): FolderTreeNode[] => node.children;

  hasChild = (_: number, _nodeData: FolderTreeFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: FolderTreeFlatNode) => _nodeData.name === '';

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: FolderTreeNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.name === node.name
        ? existingNode
        : new FolderTreeFlatNode();
    flatNode.name = node.name;
    flatNode.level = level;
    flatNode.expandable = !!node.children;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: FolderTreeFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    return descAllSelected;
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: FolderTreeFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: FolderTreeFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    // Force update for the parent
    descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    this.checkAllParentsSelection(node);
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: FolderTreeFlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: FolderTreeFlatNode): void {
    let parent: FolderTreeFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: FolderTreeFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  /* Get the parent node of a node */
  getParentNode(node: FolderTreeFlatNode): FolderTreeFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  /** Select the category so we can insert the new item. */
  addNewItem(node: FolderTreeFlatNode) {
    const parentNode = this.flatNodeMap.get(node);
    this.folderTreeService.insertItem(parentNode!, '');
    this.treeControl.expand(node);
  }

  /** Save the node to database */
  saveNode(node: FolderTreeFlatNode, itemValue: string) {
    const nestedNode = this.flatNodeMap.get(node);
    this.folderTreeService.updateItem(nestedNode!, itemValue);
  }


}
