import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
@Component({
  selector: 'app-job-create',
  templateUrl: './job-create.component.html',
  styleUrls: ['./job-create.component.css']
})
export class JobCreateComponent implements OnInit {
  jobForm: FormGroup;
  jobid:number;
  companyname:string='';
  designation:string='';
  description:string='';
  website:string='';
  address:string='';
  vacancy:number;
  salary:number;
  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {

  this.jobForm = this.formBuilder.group({
  'jobid' : [null, Validators.required],
  'companyname' : [null, Validators.required],
  'designation' : [null, Validators.required],
  'description' : [null, Validators.required],
  'website' : [null, Validators.required],
  'address' : [null, Validators.required],
  'vacancy' : [null, Validators.required],
  'salary' : [null, Validators.required]
  });

  }

  onFormSubmit(form:NgForm) {
  this.api.postJob(form)
    .subscribe(res => {
        let id = res['_id'];
        this.router.navigate(['/job-details', id]);
      }, (err) => {
        console.log(err);
      });
}

}
