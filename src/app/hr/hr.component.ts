import { Component,Injectable } from '@angular/core';
import {CollectionViewer, SelectionChange} from '@angular/cdk/collections';
import {FlatTreeControl} from '@angular/cdk/tree';
import {BehaviorSubject, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {MatProgressBar} from '@angular/material';
/** Flat node with expandable and level information */
export class DynamicFlatNode {
  constructor(public item: string, public level = 1, public expandable = false,
              public isLoading = false) {}
}

/**
 * Database for dynamic data. When expanding a node in the tree, the data source will need to fetch
 * the descendants data from the database.
 */
export class DynamicDatabase {
  dataMap = new Map<string, string[]>([
    ['Apple', ['IT Recruiter', 'Finance Manager', 'Administrative HR Manager']],
    ['Google', ['Executive Recruiter', 'Human Resources Consultant', 'Placement Manager']],
    ['Facebook', ['Employment Manager', 'Development Manager']],
    ['Expedia', ['Human Resources Manager', 'International Human Resources Professional', 'Employee Education Consultant']],
    ['Salesforce', ['Human Resources IT Specialist', 'HR Manager']],
    ['Oath', ['Human Resources IT Manager', 'Placement Recruiter']],
    ['Amazon', ['Human Resources Specialist', 'Recruiter Manager']],
    ['Chase', ['Human Resources Finance Specialist', 'Hiring Manager']],
      ['IT Recruiter', ['Wing Lu, wing.lu@gmail.com', 'Su Yan, su@gmail.com']],
        ['Finance Manager', ['Iyan Zan, iyan@gmail.com', 'Horry Diu, diu@gmail.com']],
              ['Administrative HR Manager', ['Zan Yuan, zan@gmail.com', 'Sam Daniel, sam@gmail.com']],
                ['Executive Recruiter', ['San Su, san@gmail.com']],
                  ['Human Resources Consultant', ['Philla, ph@gmail.com', 'Gomez Sans, gomes@gmail.com']],
                    ['Placement Manager', ['Dona Yan, yan@gmail.com', 'Goro, ro@gmail.com']],
                      ['Employment Manager', ['Phia Sun, sun@gmail.com', 'Gaal Kim, kim@gmail.com']],
                        ['Development Manager', ['Kimberly, kim@gmail.com', 'Harry, har@gmail.com']],
                          ['Human Resources Manager', ['Ikyan, yan@rediff.com', 'Samaual, samss@gmail.com']],
                            ['International Human Resources Professional', ['Youa Yun, yun@gmail.com', 'Fissa Kim, kim@gmail.com']],
                              ['Employee Education Consultant', ['Yuasha, yum@gmail.com', 'Whi Pho, wi@gmail.com']],
                              ['Human Resources IT Specialist', ['Kumar Abs, ab@gmail.com', 'Tina Sharma, tina@gmail.com']],
                                ['HR Manager', ['Kiz Sun, kiz@gmail.com', 'Phil Adam, adam@gmail.com']],
                                  ['Human Resources IT Manager', ['Phia Sun, sun@gmail.com', 'Gaal Kim, kim@gmail.com']],
                                    ['Placement Recruiter', ['Phia Sun, sun@gmail.com', 'Gaal Kim, kim@gmail.com']],
                                      ['Human Resources Specialist', ['Phia Sun, sun@gmail.com', 'Gaal Kim, kim@gmail.com']],
                                        ['Recruiter Manager', ['Jia, jia@gmail.com', 'Jim Kim, jim@gmail.com']],
                                        ['Human Resources Finance Specialist', ['Phia Sun, sun@gmail.com', 'Gaal Kim, kim@gmail.com']],
                                          ['Hiring Manager', ['Taz Zulfi, zulfi@gmail.com', 'Weaz Lu, lu@gmail.com']],


  ]);

  rootLevelNodes: string[] = ['Apple', 'Google',"Facebook","Expedia","Salesforce","Oath","Amazon","Chase"];

  /** Initial data from database */
  initialData(): DynamicFlatNode[] {
    return this.rootLevelNodes.map(name => new DynamicFlatNode(name, 0, true));
  }

  getChildren(node: string): string[] | undefined {
    return this.dataMap.get(node);
  }

  isExpandable(node: string): boolean {
    return this.dataMap.has(node);
  }
}
/**
 * File database, it can build a tree structured Json object from string.
 * Each node in Json object represents a file or a directory. For a file, it has filename and type.
 * For a directory, it has filename and children (a list of files or directories).
 * The input will be a json object string, and the output is a list of `FileNode` with nested
 * structure.
 */
@Injectable()
export class DynamicDataSource {

  dataChange = new BehaviorSubject<DynamicFlatNode[]>([]);

  get data(): DynamicFlatNode[] { return this.dataChange.value; }
  set data(value: DynamicFlatNode[]) {
    this.treeControl.dataNodes = value;
    this.dataChange.next(value);
  }

  constructor(private treeControl: FlatTreeControl<DynamicFlatNode>,
              private database: DynamicDatabase) {}

  connect(collectionViewer: CollectionViewer): Observable<DynamicFlatNode[]> {
    this.treeControl.expansionModel.onChange!.subscribe(change => {
      if ((change as SelectionChange<DynamicFlatNode>).added ||
        (change as SelectionChange<DynamicFlatNode>).removed) {
        this.handleTreeControl(change as SelectionChange<DynamicFlatNode>);
      }
    });

    return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
  }

  /** Handle expand/collapse behaviors */
  handleTreeControl(change: SelectionChange<DynamicFlatNode>) {
    if (change.added) {
      change.added.forEach(node => this.toggleNode(node, true));
    }
    if (change.removed) {
      change.removed.slice().reverse().forEach(node => this.toggleNode(node, false));
    }
  }

  /**
   * Toggle the node, remove from display list
   */
  toggleNode(node: DynamicFlatNode, expand: boolean) {
    const children = this.database.getChildren(node.item);
    const index = this.data.indexOf(node);
    if (!children || index < 0) { // If no children, or cannot find the node, no op
      return;
    }

    node.isLoading = true;

    setTimeout(() => {
      if (expand) {
        const nodes = children.map(name =>
          new DynamicFlatNode(name, node.level + 1, this.database.isExpandable(name)));
        this.data.splice(index + 1, 0, ...nodes);
      } else {
        let count = 0;
        for (let i = index + 1; i < this.data.length
          && this.data[i].level > node.level; i++, count++) {}
        this.data.splice(index + 1, count);
      }

      // notify the change
      this.dataChange.next(this.data);
      node.isLoading = false;
    }, 1000);
  }
}
@Component({
  selector: 'app-hr',
  templateUrl: './hr.component.html',
  styleUrls: ['./hr.component.css'],
   providers: [DynamicDatabase]
})
export class HrComponent {


  constructor(database: DynamicDatabase) {
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new DynamicDataSource(this.treeControl, database);

    this.dataSource.data = database.initialData();
  }

  treeControl: FlatTreeControl<DynamicFlatNode>;

  dataSource: DynamicDataSource;

  getLevel = (node: DynamicFlatNode) => node.level;

  isExpandable = (node: DynamicFlatNode) => node.expandable;

  hasChild = (_: number, _nodeData: DynamicFlatNode) => _nodeData.expandable;
}
