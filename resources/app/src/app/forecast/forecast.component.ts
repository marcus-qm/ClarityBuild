import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {


  subnav;

  constructor(private router: Router) { }

  ngOnInit() {

    
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.subnav = val.url;
      }
      // see also 
    });
    
    this.subnav = '/forecast/entry'
    console.log(this.subnav);
  }

}
