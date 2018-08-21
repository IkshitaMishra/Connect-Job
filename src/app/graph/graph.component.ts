import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Options, LineChartSeriesOptions } from 'highcharts';
import { Chart } from 'angular-highcharts';
import { StockChart } from 'angular-highcharts';


@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent  implements OnInit {
  options: Options;
    chart: Chart;
    options1: Options;
      chart1: Chart;

    constructor() { }

    ngOnInit(): void {
      this.options = {
        xAxis: { type: 'datetime' },
        yAxis: {
          title: {
            text: 'Employee Hired Percentage'
          }
        },
        title: { text: 'Recruitment Trend' },
        series: [{
          type: 'area',
          name: 'Facebook',
          data: [
            [Date.UTC(2013, 1, 1), 0.4],
            [Date.UTC(2013, 2, 2), 0.7648],
            [Date.UTC(2013, 3, 3), 0.6],
            [Date.UTC(2013, 4, 4), 0.79],
            [Date.UTC(2013, 5, 5), 0.89],
            [Date.UTC(2013, 6, 6), 0.4],
            [Date.UTC(2013, 7, 7), 0.83],
            [Date.UTC(2013, 8, 8), 0.9],
            [Date.UTC(2013, 9, 9), 0.79],
            [Date.UTC(2013, 10, 10), 0.89],
            [Date.UTC(2013, 11, 11), 0.23],
            [Date.UTC(2013, 12, 12), 0.83]
          ]
        },{
          type: 'area',
          name: 'Amazon',
          data: [
            [Date.UTC(2013, 1, 1), 0.6],
            [Date.UTC(2013, 2, 2), 0.5648],
            [Date.UTC(2013, 3, 3), 0.690],
            [Date.UTC(2013, 4, 4), 0.449],
            [Date.UTC(2013, 5, 5), 0.759],
            [Date.UTC(2013, 6, 6), 0.54],
            [Date.UTC(2013, 7, 7), 0.903],
            [Date.UTC(2013, 8, 8), 0.903],
            [Date.UTC(2013, 9, 9), 0.69],
            [Date.UTC(2013, 10, 10), 0.79],
            [Date.UTC(2013, 11, 11), 0.45],
            [Date.UTC(2013, 12, 12), 0.9093]
          ]
        },
        {
          type: 'area',
          name: 'Google',
          data: [
            [Date.UTC(2013, 1, 1), .3],
            [Date.UTC(2013, 2, 2), 0.54],
            [Date.UTC(2013, 3, 3), 0.53],
            [Date.UTC(2013, 4, 4), 0.24],
            [Date.UTC(2013, 5, 5), 0.7],
            [Date.UTC(2013, 6, 6), 0.4],
            [Date.UTC(2013, 7,7), 0.3],
            [Date.UTC(2013, 8, 8), 0.6],
            [Date.UTC(2013, 9, 9), 0.4],
            [Date.UTC(2013, 10, 10), 0.2],
            [Date.UTC(2013, 11, 11), 0.4],
            [Date.UTC(2013, 12, 12), 0.83]
          ]
        }]
      };
      this.chart = new Chart(this.options);


              this.options1 = {
                xAxis: { type: 'datetime' },
                yAxis: {
                  title: {
                    text: 'Stipend Per Annum ($K)'
                  }
                },
                title: { text: 'Salary Trends' },
                series: [{
                  type: 'spline',
                  name: 'Information Technology',
                  data: [
                      [Date.UTC(2011, 5, 1), 150],
                      [Date.UTC(2012, 5, 3), 170],
                      [Date.UTC(2015,5 , 4),160],
                  ]
                },{
                  type: 'spline',
                  name: 'Data Science',
                  data: [
                    [Date.UTC(2011, 5, 1), 130],
                    [Date.UTC(2012, 5, 3), 160],
                    [Date.UTC(2015,5 , 4),182],
                  ]
                },{
                  type: 'spline',
                  name: 'Accounts and Finance',
                  data: [
                    [Date.UTC(2011, 5, 1), 105],
                    [Date.UTC(2012, 5, 3), 100],
                    [Date.UTC(2015,5 , 4),120],
                  ]
                },{
                  type: 'spline',
                  name: 'Sales and Marketing',
                  data: [
                    [Date.UTC(2011, 5, 1), 100],
                    [Date.UTC(2012, 5, 3), 90],
                    [Date.UTC(2015,5 , 4),65],
                  ]
                },
                {
                  type: 'spline',
                  name: 'Administrative',
                  data: [
                    [Date.UTC(2011, 5, 1), 120],
                    [Date.UTC(2012, 5, 3), 100],
                    [Date.UTC(2015,5 , 4),135],
                  ]
                }]
              };
              this.chart1 = new Chart(this.options1);


    }










 }
