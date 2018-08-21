import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.css']
})
export class JobEditComponent implements OnInit {
  jobForm: FormGroup;
  id:string = '';
  jobid:number;
  companyname:string='';
  designation:string='';
  description:string='';
  website:string='';
  address:string='';
  vacancy:number;
  salary:number;
  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
     this.getJob(this.route.snapshot.params['id']);
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

  getJob(id) {
    this.api.getJob(id).subscribe(data => {
      this.id = data._id;
      this.jobForm.setValue({
        jobid: data.jobid,
        companyname: data.companyname,
        designation: data.designation,
        description: data.description,
        website: data.website,
        address: data.address,
        vacancy: data.vacancy,
        salary: data.salary
      });
    });
  }


    onFormSubmit(form:NgForm) {
      this.api.updateJob(this.id, form)
        .subscribe(res => {
            let id = res['_id'];
            this.router.navigate(['/job-details', id]);
          }, (err) => {
            console.log(err);
          }
        );
    }

jobDetails() {
  this.router.navigate(['/job-details', this.id]);
}

}
