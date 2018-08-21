import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  subtitle = "First Tier Companies";
  items = ["Google", "Facebook", "Expedia", "Apple" , "Chase", "Visa","LinkedIn","Salesforce","Amazon","BlackRock","Oath"];
constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }
  ngOnInit() {
  }

}
