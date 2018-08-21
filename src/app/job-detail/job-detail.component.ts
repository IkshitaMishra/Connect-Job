import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
export interface Tile {
  cols: number;
  rows: number;
  text: string;
}
@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})

export class JobDetailComponent implements OnInit {
  job = {};
constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }
  getJobDetails(id) {
  this.api.getJob(id)
    .subscribe(data => {
      console.log(data);
      this.job = data;
    });
}
  ngOnInit() {
    this.getJobDetails(this.route.snapshot.params['id']);
  }
  deleteJob(id) {
    this.api.deleteJob(id)
      .subscribe(res => {
          this.router.navigate(['/jobs']);
        }, (err) => {
          console.log(err);
        }
      );
  }


}
