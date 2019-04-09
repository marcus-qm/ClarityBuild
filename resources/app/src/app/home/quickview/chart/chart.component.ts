import { Component, OnInit, Input, AfterViewInit, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import * as Chart from 'chart.js';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() id: string;

  @Input() labels: any;

  @Input() data: any;

  @Input() chartLabel: any;

  @Input() resetChart: any;

  @Input() chartType: any;

  canvas: any;
  ctx: any;
  myChart: any;

  showBlank;

  piecolors;



  constructor(private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.piecolors = [];
    //console.log(this.data);
    this.checkDislay();

  }

  ngOnChanges(changes: SimpleChanges) {
    // only run when property "data" changed
    // if (changes['data']) {
    //   this.groupPosts = this.groupByCategory(this.data);
    // }
    console.log(changes)
    if (this.myChart) {
      this.resetChartData(this.myChart)
      // this.removeData(this.myChart);
      // this.addData(this.myChart, changes.labels.currentValue, changes.data.currentValue)
      this.myChart.update();
    }

  }

  resetChartData(chart) {
    chart.destroy();

    var gradientStroke = this.ctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0, "#80b6f4");
    gradientStroke.addColorStop(1, "#f49080");

    this.myChart = new Chart(this.ctx, {
      type: this.chartType || 'bar',
      data: {
        labels: this.labels,
        datasets: [{
          label: this.chartLabel,
          data: this.data,
          backgroundColor: this.chartType == "pie" ? this.loopColors() :
            gradientStroke
          ,
          borderWidth: 1,
          borderColor: this.chartType == "pie" ? this.loopColors() :
            gradientStroke,
          pointBorderColor: gradientStroke,
          pointBackgroundColor: gradientStroke,
          pointHoverBackgroundColor: gradientStroke,
          pointHoverBorderColor: gradientStroke
        }]
      },
      options: {
        responsive: true
      }
    });

}

addData(chart, label, data) {
  chart.data.labels.push(label);
  chart.data.datasets.forEach((dataset) => {
    dataset.data.push(data);
  });
  chart.update();
}

removeData(chart) {
  chart.data.labels.pop();
  chart.data.datasets.forEach((dataset) => {
    dataset.data.pop();
  });
  console.log(chart)
  chart.update();
}

checkDislay() {
  if (this.data === undefined || this.data == [] || this.data.length == 0) {
    this.showBlank = true;
  } else {
    this.showBlank = false;
  }
}

loopColors() {
  let bgcolors = [];
  for (let i = 0; i < this.labels.length; ++i) bgcolors.push(this.piecolors[i % this.piecolors.length]);
  return bgcolors;
}

ngAfterViewInit() {
  //console.log.log(this.data);
  this.checkDislay();



  if (!this.showBlank) {

    console.log(this.id)
    this.canvas = document.getElementById(this.id);
    this.ctx = this.canvas.getContext('2d');
    var gradientStroke = this.ctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0, "#80b6f4");
    gradientStroke.addColorStop(1, "#f49080");
    if (this.chartType == "pie") {
      this.piecolors = ["#5C8EBF", "#3E5F7F", "#7BBDFF", "#1F2F40", "#6FAAE5"];
    }
    this.myChart = new Chart(this.ctx, {
      type: this.chartType || 'bar',
      data: {
        labels: this.labels,
        datasets: [{
          label: this.chartLabel,
          data: this.data,
          backgroundColor: this.chartType == "pie" ? this.loopColors() :
            gradientStroke
          ,
          borderWidth: 1,
          borderColor: this.chartType == "pie" ? this.loopColors() :
            gradientStroke,
          pointBorderColor: gradientStroke,
          pointBackgroundColor: gradientStroke,
          pointHoverBackgroundColor: gradientStroke,
          pointHoverBorderColor: gradientStroke
        }]
      },
      options: {
        responsive: true
      }
    });

  }



  this.cd.detectChanges();


}


}
