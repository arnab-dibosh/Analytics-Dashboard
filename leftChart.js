function drawLeftChart(domId){

var data=
[
    {"area": "market 1 ", "oneDay": 60, "threeDay": 70, "sevenDay": 90, "LF": 100 },
    {"area": "market 2", "oneDay": 40, "threeDay": 50, "sevenDay": 60, "LF": 70 },
    {"area": "market 3", "oneDay": 10, "threeDay": 20, "sevenDay": 30, "LF": 40 },
]

var leftChart = d3.select(domId);
var margin = {top: 20, right: 20, bottom: 30, left: 80};
var width = +leftChart.attr("width") - margin.left - margin.right;
var height = +leftChart.attr("height") - margin.top - margin.bottom;
  
var tooltip = d3.select("body").append("div").attr("class", "toolTip");
  
var x = d3.scaleLinear().range([width, 0]);
var y = d3.scaleBand().range([height, 0]);

var g = leftChart.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  	x.domain([0, d3.max(data, function(d) { return d3.max([d.oneDay, d.threeDay, d.sevenDay, d.LF]) ; })]);
    y.domain(data.map(function(d) { return d.area; })).padding(0.5);

    g.append("g")
        .attr("class", "x axis")
       	.attr("transform", "translate(0," + height + ")")
      	.call(d3.axisBottom(x).ticks(5).tickFormat(function(d) { return parseInt(d); }).tickSizeInner([-height]));

    g.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(y));

 g.selectAll(".lf")
        .data(data)
      .enter().append("rect")
        .attr("class", "lf")
        .attr("x", function(d){return x(d.LF) })
        .attr("height", y.bandwidth())
        .attr("y", function(d) { return y(d.area); })
        .on("mouseover", function(d){
            tooltip
              .style("left", d3.event.pageX - 50 + "px")
              .style("top", d3.event.pageY - 70 + "px")
              .style("display", "inline-block")
              .html((d.area) + "<br>"+ (d.LF));
        })     
    	.on("mouseout", function(d){ tooltip.style("display", "none");})        
        .attr("width", 0)
        .transition()
        .duration(1500)
        .attr("width", function(d) { return x(0) - x(d.LF); });




g.selectAll(".sevenDay")
        .data(data)
      .enter().append("rect")
        .attr("class", "sevenDay")
        .attr("x", function(d){return x(d.sevenDay) })
        .attr("height", y.bandwidth())
        .attr("y", function(d) { return y(d.area); })
        .on("mouseover", function(d){
            tooltip
              .style("left", d3.event.pageX - 50 + "px")
              .style("top", d3.event.pageY - 70 + "px")
              .style("display", "inline-block")
              .html((d.area) + "<br>"+ (d.sevenDay));
        })     
    	.on("mouseout", function(d){ tooltip.style("display", "none");})        
        .attr("width", 0)
        .transition()
        .duration(1500)
        .attr("width", function(d) { return x(0) - x(d.sevenDay); });

g.selectAll(".threeDay")
        .data(data)
      .enter().append("rect")
        .attr("class", "threeDay")
        .attr("x", function(d){return x(d.threeDay) })
        .attr("height", y.bandwidth())
        .attr("y", function(d) { return y(d.area); })
        .on("mouseover", function(d){
            tooltip
              .style("left", d3.event.pageX - 50 + "px")
              .style("top", d3.event.pageY - 70 + "px")
              .style("display", "inline-block")
              .html((d.area) + "<br>"+ (d.threeDay));
        })     
    	.on("mouseout", function(d){ tooltip.style("display", "none");})        
        .attr("width", 0)
        .transition()
        .duration(1500)
        .attr("width", function(d) { return x(0) - x(d.threeDay); });

g.selectAll(".oneDay")
        .data(data)
      .enter().append("rect")
        .attr("class", "oneDay")
        .attr("x", function(d){return x(d.oneDay) })
        .attr("height", y.bandwidth())
        .attr("y", function(d) { return y(d.area); })
        .on("mouseover", function(d){
            tooltip
              .style("left", d3.event.pageX - 50 + "px")
              .style("top", d3.event.pageY - 70 + "px")
              .style("display", "inline-block")
              .html((d.area) + "<br>"+ (d.oneDay));
        })     
    	.on("mouseout", function(d){ tooltip.style("display", "none");})        
        .attr("width", 0)
        .transition()
        .duration(1500)
        .attr("width", function(d) { return x(0) - x(d.oneDay); });
      
}