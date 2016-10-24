import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';


import * as d3 from 'd3';
//import d3 from 'd3'

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {

  constructor(public navCtrl: NavController) {
      console.log(d3);
      /*
var brush = d3.brush();
  
var svg = d3..select("svg");

svg.append("g")
    .attr("class", "brush")
    .call(brush)
    .call(brush.move, [[307, 167], [611, 539]])
  .select(".selection")
    .attr("id", "brush-selection");
    console.log(svg);
svg.append("clipPath")
    .attr("id", "brush-clip")
  .append("use")
    .attr("xlink:href", "#brush-selection");

svg.select("#color-image")
    .attr("clip-path", "url(#brush-clip)");
  console.log(svg);
*/
  }

}
