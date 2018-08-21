import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator,MatSort, MatTableDataSource} from '@angular/material';
import { ApiService } from '../api.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {
jobs: any;
displayedColumns = ['jobid', 'companyname', 'designation','description','website','address','vacancy','salary','edit','view'];
dataSource = new JobDataSource(this.api);
  @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }

ngOnInit() {

  this.api.getJobs()
    .subscribe(res => {
      console.log(res);
      //this.jobs = res;
      this.jobs = new MatTableDataSource(res);
        this.jobs.paginator = this.paginator;
            this.jobs.sort = this.sort;

    }, err => {
      console.log(err);
    });



}

applyFilter(filterValue: string) {
  this.jobs.filter = filterValue.trim().toLowerCase();

  if (this.jobs.paginator) {
    this.jobs.paginator.firstPage();
  }
}



}



export class JobDataSource extends DataSource<any> {
  constructor(private api: ApiService) {
    super()
  }

  connect() {
    return this.api.getJobs();

  }

  disconnect() {

  }
}
