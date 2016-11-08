import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';


//import * as go from 'go'
//import * as gojs from 'gojs';

 
@Component({
  selector: 'page-page3',
  templateUrl: 'page3.html'
})
export class Page3 {

     go: any;
myDiagram: any;
distances: any;
sel: any;
  constructor(public navCtrl: NavController) {

  }

  ngAfterViewInit() {
      
    //if (window.goSamples) goSamples();  // init for these samples -- you don't need to call this
    var $ = (<any>window).go.GraphObject.make;  // for conciseness in defining templates
    this.myDiagram =
      $((<any>window).go.Diagram, "myDiagramDiv", // must be the ID or reference to div
        {
          initialAutoScale: (<any>window).go.Diagram.UniformToFill,
          padding: 10,
          contentAlignment: (<any>window).go.Spot.Center,
          layout: $((<any>window).go.ForceDirectedLayout, { defaultSpringLength: 10 }),
          maxSelectionCount: 2
        });
    // define the Node template
    this.myDiagram.nodeTemplate =
      $((<any>window).go.Node, "Horizontal",
        { locationSpot: (<any>window).go.Spot.Center,  // Node.location is the center of the Shape
          locationObjectName: "SHAPE",
          selectionAdorned: false,
          selectionChanged: this.nodeSelectionChanged },
        $((<any>window).go.Panel, "Auto",
          $((<any>window).go.Shape, "Ellipse",
            { name: "SHAPE",
              fill: "lightgray",  // default value, but also data-bound
              stroke: "transparent",  // modified by highlighting
              strokeWidth: 2,
              desiredSize: new (<any>window).go.Size(30, 30),
              portId: "" },  // so links will go to the shape, not the whole node
            new (<any>window).go.Binding("fill", "isSelected", function(s, obj) { return s ? "red" : obj.part.data.color; }).ofObject()),
          $((<any>window).go.TextBlock,
            new (<any>window).go.Binding("text", "distance", function(d) { return (d === Infinity) ?  "INF" : d | 0;/*if (d === Infinity) return "INF"; else return d | 0;*/ }))),
        $((<any>window).go.TextBlock,
          new (<any>window).go.Binding("text")));
    // define the Link template
    this.myDiagram.linkTemplate =
      $((<any>window).go.Link,
        {
          selectable: false,      // links cannot be selected by the user
          curve: (<any>window).go.Link.Bezier,
          layerName: "Background"  // don't cross in front of any nodes
        },
        $((<any>window).go.Shape,  // this shape only shows when it isHighlighted
          { isPanelMain: true, stroke: null, strokeWidth: 5 },
          new (<any>window).go.Binding("stroke", "isHighlighted", function(h) { return h ? "red" : null; }).ofObject()),
        $((<any>window).go.Shape,
          // mark each Shape to get the link geometry with isPanelMain: true
          { isPanelMain: true, stroke: "black", strokeWidth: 1 },
          new (<any>window).go.Binding("stroke", "color")),
        $((<any>window).go.Shape, { toArrow: "Standard" })
      );
    // Override the clickSelectingTool's standardMouseSelect
    // If less than 2 nodes are selected, always add to the selection
    this.myDiagram.toolManager.clickSelectingTool.standardMouseSelect = function() {
      var diagram = this.diagram;
      if (diagram === null || !diagram.allowSelect) return;
      var e = diagram.lastInput;
      var count = diagram.selection.count;
      var curobj = diagram.findPartAt(e.documentPoint, false);
      if (curobj !== null) {
        if (count < 2) {  // add the part to the selection
          if (!curobj.isSelected) {
            var part = curobj;
            if (part !== null) part.isSelected = true;
          }
        } else {
          if (!curobj.isSelected) {
            var part = curobj;
            if (part !== null) diagram.select(part);
          }
        }
      } else if (e.left && !(e.control || e.meta) && !e.shift) {
        // left click on background with no modifier: clear selection
        diagram.clearSelection();
      }
    }
   this.generateGraph();
    // select two nodes that connect from the first one to the second one
    var num = this.myDiagram.model.nodeDataArray.length;
    var node1 = null;
    var node2 = null;
    for (var i = 0; i < num; i++) {
      node1 = this.myDiagram.findNodeForKey(i);
      var distances = this.findDistances(node1);
      for (var j = 0; j < num; j++) {
        node2 = this.myDiagram.findNodeForKey(j);
        var dist = distances.getValue(node2);
        if (dist > 1 && dist < Infinity) {
          node1.isSelected = true;
          node2.isSelected = true;
          break;
        }
      }
      if (this.myDiagram.selection.count > 0) break;
    }
  }
    
generateGraph() {
    var names = [
      "Joshua", "Kathryn", "Robert", "Jason", "Scott", "Betsy", "John",
      "Walter", "Gabriel", "Simon", "Emily", "Tina", "Elena", "Samuel",
      "Jacob", "Michael", "Juliana", "Natalie", "Grace", "Ashley", "Dylan"
    ];
    var nodeDataArray = [];
    for (var i = 0; i < names.length; i++) {
      nodeDataArray.push({ key: i, text: names[i], color: (<any>window).go.Brush.randomColor(128, 240) });
    }
    var linkDataArray = [];
    var num = nodeDataArray.length;
    for (var i = 0; i < num * 2; i++) {
      var a = Math.floor(Math.random() * num);
      var b = Math.floor(Math.random() * num / 4) + 1;
      linkDataArray.push({ from: a, to: (a + b) % num, color: (<any>window).go.Brush.randomColor(0, 127) });
    }
    this.myDiagram.model = new (<any>window).go.GraphLinksModel(nodeDataArray, linkDataArray);
  }
 
   
    
  // There are three bits of functionality here:
  // 1: findDistances(Node) computes the distance of each Node from the given Node.
  //    This function is used by showDistances to update the model data.
  // 2: findShortestPath(Node, Node) finds a shortest path from one Node to another.
  //    This uses findDistances.  This is used by highlightShortestPath.
  // 3: collectAllPaths(Node, Node) produces a collection of all paths from one Node to another.
  //    This is used by listAllPaths.  The result is remembered in a global variable
  //    which is used by highlightSelectedPath.  This does not depend on findDistances.
  // Returns a Map of Nodes with distance values from the given source Node.
  // Assumes all links are unidirectional.
 findDistances(source) {
    var diagram = source.diagram;
    // keep track of distances from the source node
    var distances = new (<any>window).go.Map((<any>window).go.Node, "number");
    // all nodes start with distance Infinity
    var nit = diagram.nodes;
    while (nit.next()) {
      var n = nit.value;
      distances.add(n, Infinity);
    }
    // the source node starts with distance 0
    distances.add(source, 0);
    // keep track of nodes for which we have set a non-Infinity distance,
    // but which we have not yet finished examining
    var seen = new (<any>window).go.Set((<any>window).go.Node);
    seen.add(source);
    // keep track of nodes we have finished examining;
    // this avoids unnecessary traversals and helps keep the SEEN collection small
    var finished = new (<any>window).go.Set((<any>window).go.Node);
    while (seen.count > 0) {
      // look at the unfinished node with the shortest distance so far
      var least = this.leastNode(seen, distances);
      var leastdist = distances.getValue(least);
      // by the end of this loop we will have finished examining this LEAST node
      seen.remove(least);
      finished.add(least);
      // look at all Links connected with this node
      var it = least.findLinksOutOf();
      while (it.next()) {
        var link = it.value;
        var neighbor = link.getOtherNode(least);
        // skip nodes that we have finished
        if (finished.contains(neighbor)) continue;
        var neighbordist = distances.getValue(neighbor);
        // assume "distance" along a link is unitary, but could be any non-negative number.
        var dist = leastdist + 1;  //Math.sqrt(least.location.distanceSquaredPoint(neighbor.location));
        if (dist < neighbordist) {
          // if haven't seen that node before, add it to the SEEN collection
          if (neighbordist === Infinity) {
            seen.add(neighbor);
          }
          // record the new best distance so far to that node
          distances.add(neighbor, dist);
        }
      }
    }
    return distances;
  }
 




// This helper function finds a Node in the given collection that has the smallest distance.
   leastNode(coll, distances) {
    var bestdist = Infinity;
    var bestnode = null;
    var it = coll.iterator;
    while (it.next()) {
      var n = it.value;
      var dist = distances.getValue(n);
      if (dist < bestdist) {
        bestdist = dist;
        bestnode = n;
      }
    }
    return bestnode;
  }
    
    
    
    
    
  // Find a path that is shortest from the BEGIN node to the END node.
  // (There might be more than one, and there might be none.)
  findShortestPath(begin, end) {
    // compute and remember the distance of each node from the BEGIN node
    this.distances = this.findDistances(begin);
    // now find a path from END to BEGIN, always choosing the adjacent Node with the lowest distance
    var path = new (<any>window).go.List();
    path.add(end);
    while (end !== null) {
      var next = this.leastNode(end.findNodesInto(), this.distances);
      if (next !== null) {
        if (this.distances.getValue(next) < this.distances.getValue(end)) {
          path.add(next);  // making progress towards the beginning
        } else {
          next = null;  // nothing better found -- stop looking
        }
      }
      end = next;
    }
    // reverse the list to start at the node closest to BEGIN that is on the path to END
    // NOTE: if there's no path from BEGIN to END, the first node won't be BEGIN!
    path.reverse();
    return path;
  }
  



// Recursively walk the graph starting from the BEGIN node;
  // when reaching the END node remember the list of nodes along the current path.
  // Finally return the collection of paths, which may be empty.
  // This assumes all links are unidirectional.
   collectAllPaths(begin, end) {
    var stack = new (<any>window).go.List((<any>window).go.Node);
    var coll = new (<any>window).go.List((<any>window).go.List);
    function find(source, end) {
      source.findNodesOutOf().each(function(n) {
        if (n === source) return;  // ignore reflexive links
        if (n === end) {  // success
          var path = stack.copy();
          path.add(end);  // finish the path at the end node
          coll.add(path);  // remember the whole path
        } else if (!stack.contains(n)) {  // inefficient way to check having visited
          stack.add(n);  // remember that we've been here for this path (but not forever)
          find(n, end);
          stack.removeAt(stack.count - 1);
        }  // else might be a cycle
      });
    }
    stack.add(begin);  // start the path at the begin node
    find(begin, end);
    return coll;
  }
  



// Return a string representation of a path for humans to read.
   pathToString(path) {
    var s = path.length + ": ";
    for (var i = 0; i < path.length; i++) {
      if (i > 0) s += " -- ";
      s += path.elt(i).data.text;
    }
    return s;
  }
    
    
    
  // When a node is selected show distances from the first selected node.
  // When a second node is selected, highlight the shortest path between two selected nodes.
  // If a node is deselected, clear all highlights.
 nodeSelectionChanged(node) {
    var diagram = node.diagram;
    if (diagram === null) return;
    diagram.clearHighlighteds();
    if (node.isSelected) {
      // when there is a selection made, always clear out the list of all paths
      var sel = document.getElementById("myPaths");
      sel.innerHTML = "";
      // show the distance for each node from the selected node
      var begin = diagram.selection.first();
      this.showDistances(begin);
      if (diagram.selection.count === 2) {
        var end = node;  // just became selected
        // highlight the shortest path
        this.highlightShortestPath(begin, end);
        // list all paths
        this.listAllPaths(begin, end);
      }
    }
  }



// Have each node show how far it is from the BEGIN node.
 showDistances(begin) {
    // compute and remember the distance of each node from the BEGIN node
    this.distances = this.findDistances(begin);
    // show the distance on each node
    var it = this.distances.iterator;
    while (it.next()) {
      var n = it.key;
      var dist = it.value;
      this.myDiagram.model.setDataProperty(n.data, "distance", dist);
    }
  }



// Highlight links along one of the shortest paths between the BEGIN and the END nodes.
  // Assume links are unidirectional.
 highlightShortestPath(begin, end) {
    this.highlightPath(this.findShortestPath(begin, end));
  }
  


// List all paths from BEGIN to END
   listAllPaths(begin, end) {
    // compute and remember all paths from BEGIN to END: Lists of Nodes
    this.paths = this.collectAllPaths(begin, end);
    // update the Selection element with a bunch of Option elements, one per path
        var sel = (document.getElementById("myPaths") as HTMLSelectElement);

    sel.innerHTML = "";  // clear out any old Option elements
    this.paths.each(function(p) {
      var opt = document.createElement("option") ;
      opt.text = this.pathToString(p);
      sel.add(opt, null);
    });
    sel.onchange = this.highlightSelectedPath;
  }
   
    
  // A collection of all of the paths between a pair of nodes, a List of Lists of Nodes
   paths = null;
  



// This is only used for listing all paths for the selection onchange event.
  // When the selected item changes in the Selection element,
  // highlight the corresponding path of nodes.
   highlightSelectedPath() {
       var sel = (document.getElementById("myPaths") as HTMLSelectElement);
    var idx = sel.selectedIndex ;
    var opt = sel.options[idx];
    var val = opt.value;
    this.highlightPath(this.paths.elt(sel.selectedIndex));
  }
  // Highlight a particular path, a List of Nodes.
  highlightPath(path) {
    this.myDiagram.clearHighlighteds();
    for (var i = 0; i < path.count - 1; i++) {
      var f = path.elt(i);
      var t = path.elt(i + 1);
      f.findLinksTo(t).each(function(l) { l.isHighlighted = true; });
    }
  }
    
    
}
