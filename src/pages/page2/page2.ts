import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import * as d3shape from 'd3-shape'
import * as d3timer from 'd3-timer'
import * as d3ease from 'd3-ease'


@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html'
})
export class Page2 {

  constructor(public navCtrl: NavController) {
    
  }

    ngAfterViewInit() {
        

        
        
        
        var data = [1, 1, 2, 3, 5, 8, 13, 21];

var canvas = document.querySelector("canvas"),
    context = canvas.getContext("2d");

var width = canvas.width,
    height = canvas.height,
    outerRadius = height / 2 - 30,
    innerRadius = outerRadius / 3;
var colors = [
  "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd",
  "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"
];

        
var arc = d3shape.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)
    .context(context);

var pie = d3shape.pie();

var ease = d3ease.easeCubicInOut,
    duration = 2500;

d3timer.timer(function(elapsed) {
  var t = ease(1 - Math.abs((elapsed % duration) / duration - 0.5) * 2),
      arcs = pie.padAngle(0.06 * t)(data);

  context.save();
  context.clearRect(0, 0, width, height);
  context.translate(width / 2, height / 2);

  context.beginPath();
  arcs.forEach(arc.padAngle(0));
  context.lineWidth = 1;
  context.strokeStyle = "#777";
  context.stroke();

//  context.beginPath();
  arcs.forEach(arc.padAngle(0.06 * t));
  context.fillStyle = "#ccc";
    arcs.forEach(function(d, i) {
  context.beginPath();
  arc(d);
  context.fillStyle = colors[i];
  context.fill();
});
 // context.fill();
  context.lineWidth = 1.5;
  context.lineJoin = "round";
  context.strokeStyle = "#000";
  context.stroke();

  context.restore();
});
}
 
 
}