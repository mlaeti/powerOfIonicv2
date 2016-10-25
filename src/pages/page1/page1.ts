import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';


import * as d3select from 'd3-selection'
import * as d3brush from 'd3-brush'


@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {

  constructor(public navCtrl: NavController) {
     
 
  }

  ngAfterViewInit() {
      var brush = d3brush.brush();
    var svg = d3select.select("svg");
 
      
    svg.append("g")
    .attr("class", "brush")
    .call(brush)
    .call(brush.move, [[307, 167], [311, 239]])
    .select(".selection")
    .attr("id", "brush-selection");

    svg.append("clipPath")
        .attr("id", "brush-clip")
      .append("use")
        .attr("xlink:href", "#brush-selection");

    svg.select("#color-image")
        .attr("clip-path", "url(#brush-clip)");
  }


}
