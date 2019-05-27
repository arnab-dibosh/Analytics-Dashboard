function drawRightChart(domId){

var svg = d3.select(domId);
var margin = {top: 20, right: 20, bottom: 30, left: 80};
var width = +svg.attr("width") - margin.left - margin.right;
var height = +svg.attr("height") - margin.top - margin.bottom;
  
var tooltip = d3.select("body").append("div").attr("class", "toolTip");
  
var x = d3.scaleLinear().range([0, width]);
var y = d3.scaleBand().range([0, height]);

var g = svg.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
var data=
  [
      {"area": "central ", "value": 18000},
      {"area": "Riverside ", "value": 17000},
      {"area": "Picton ", "value": 80000},
      {"area": "Everton ", "value": 55000},
      {"area": "Kensington ", "value": 100000},
      {"area": "Kirkdale", "value": 50000}
  ]
  
  //	data.sort(function(a, b) { return a.value - b.value; });
  
  	x.domain([0, d3.max(data, function(d) { return d.value; })]);
    y.domain(data.map(function(d) { return d.area; })).padding(0.1);

    g.append("g")
        .attr("class", "x axis")
       	.attr("transform", "translate(0," + height + ")")
      	.call(d3.axisBottom(x).ticks(5).tickFormat(function(d) { return parseInt(d / 1000); }).tickSizeInner([-height]));

    g.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(y));

    g.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", 0)
        .attr("height", y.bandwidth())
        .attr("y", function(d) { return y(d.area); })
        .attr("width", function(d) { return x(d.value); });       

}