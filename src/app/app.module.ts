
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { JobComponent } from './job/job.component';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { JobCreateComponent } from './job-create/job-create.component';
import { JobEditComponent } from './job-edit/job-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import * as highcharts from 'highcharts';
import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import {
  MatInputModule,
  MatPaginatorModule,
    MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatGridListModule,
  MatFormFieldModule,
  MatTabsModule,
  MatTreeModule,
MatChipsModule,
MatSlideToggleModule,
MatSnackBarModule,
MatToolbarModule,
MatExpansionModule,
MatListModule} from "@angular/material";
import { HomeComponent } from './home/home.component';
import { HrComponent } from './hr/hr.component';
import { mapsComponent } from './maps/maps.component';
import { GraphComponent } from './graph/graph.component';
import { ScheduleComponent } from './schedule/schedule.component';

const appRoutes: Routes = [
  {
    path: 'jobs',
    component: JobComponent,
    data: { title: 'Job List' }
  },
  {
    path: 'job-details/:id',
    component: JobDetailComponent,
    data: { title: 'Job Details' }
  },
  {
    path: 'job-create',
    component: JobCreateComponent,
    data: { title: 'Create Job' }
  },
  {
    path: 'job-edit/:id',
    component: JobEditComponent,
    data: { title: 'Edit Job' }
  },
  {
    path: 'hr',
    component: HrComponent,
    data: { title: 'Hr Directory' }
  },
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'Home Page' }
  },
  {
    path: 'maps',
    component: mapsComponent,
    data: { title: 'map Page' }
  },
  {
    path: 'graph',
    component: GraphComponent,
    data: { title: 'Graph Page' }
  },

  {
    path: 'schedule',
    component: ScheduleComponent,
    data: { title: 'Schedule Page' }
  },

  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];
@NgModule({
  declarations: [
    AppComponent,
    JobComponent,
    JobDetailComponent,
    JobCreateComponent,
    JobEditComponent,
    HomeComponent,
    HrComponent,
    mapsComponent,
    GraphComponent,
    ScheduleComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
  BrowserModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  BrowserAnimationsModule,
  MatInputModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
    MatProgressBarModule,
  MatProgressSpinnerModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatGridListModule,
  MatFormFieldModule,
  MatTabsModule,
    MatTreeModule,
  NgxPaginationModule,
  MatChipsModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatExpansionModule,
  MatListModule,
 ChartModule,
  CommonModule,
 AgmCoreModule.forRoot(  {
      apiKey: 'yourKey',
    libraries: ["places"]
  }),
  AngularFirestoreModule,
   AngularFireModule.initializeApp(environment.firebase),
   AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
AngularFireStorageModule // imports firebase/storage only needed for storage features

  ],
  providers: [{
    provide: HighchartsStatic,
       useValue: highcharts
},
],
  bootstrap: [AppComponent]
})
export class AppModule { }


platformBrowserDynamic().bootstrapModule(AppModule);
