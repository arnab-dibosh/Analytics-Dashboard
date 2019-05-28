function drawLeftChart(domId, data){


var leftChart = d3.select(domId);
var margin = {top: 20, right: 50, bottom: 30, left: 80};
var width = +leftChart.attr("width") - margin.left - margin.right;
var height = +leftChart.attr("height") - margin.top - margin.bottom;
  
var tooltip = d3.select("body").append("div").attr("class", "toolTip");
  
var x = d3.scaleLinear().range([width, 0]);
var y = d3.scaleBand().range([height, 0]);

var g = leftChart.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  	x.domain([0, d3.max(data, function(d) { return d3.max([d["1_DAY"], d['3_DAY'], d['7_DAY'], d.LF]) ; })]);
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
        .attr("y", function(d) { return y(d.label); })
        .on("mouseover", function(d){
            tooltip
              .style("left", d3.event.pageX - 50 + "px")
              .style("top", d3.event.pageY - 70 + "px")
              .style("display", "inline-block")
              .html("LF" + "<br>"+ (d.LF));
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
        .attr("x", function(d){return x(d['7_DAY']) })
        .attr("height", y.bandwidth())
        .attr("y", function(d) { return y(d.label); })
        .on("mouseover", function(d){
            tooltip
              .style("left", d3.event.pageX - 50 + "px")
              .style("top", d3.event.pageY - 70 + "px")
              .style("display", "inline-block")
              .html("Seven Day" + "<br>"+ (d['7_DAY']));
        })     
    	.on("mouseout", function(d){ tooltip.style("display", "none");})        
        .attr("width", 0)
        .transition()
        .duration(1500)
        .attr("width", function(d) { return x(0) - x(d['7_DAY']); });

g.selectAll(".threeDay")
        .data(data)
      .enter().append("rect")
        .attr("class", "threeDay")
        .attr("x", function(d){return x(d['3_DAY']) })
        .attr("height", y.bandwidth())
        .attr("y", function(d) { return y(d.label); })
        .on("mouseover", function(d){
            tooltip
              .style("left", d3.event.pageX - 50 + "px")
              .style("top", d3.event.pageY - 70 + "px")
              .style("display", "inline-block")
              .html("Three Day" + "<br>"+ (d['3_DAY']));
        })     
    	.on("mouseout", function(d){ tooltip.style("display", "none");})        
        .attr("width", 0)
        .transition()
        .duration(1500)
        .attr("width", function(d) { return x(0) - x(d['3_DAY']); });

g.selectAll(".oneDay")
        .data(data)
      .enter().append("rect")
        .attr("class", "oneDay")
        .attr("x", function(d){return x(d['1_DAY']) })
        .attr("height", y.bandwidth())
        .attr("y", function(d) { return y(d.label); })
        .on("mouseover", function(d){
            tooltip
              .style("left", d3.event.pageX - 50 + "px")
              .style("top", d3.event.pageY - 70 + "px")
              .style("display", "inline-block")
              .html("One Day" + "<br>"+ (d['1_DAY']));
        })     
    	.on("mouseout", function(d){ tooltip.style("display", "none");})        
        .attr("width", 0)
        .transition()
        .duration(1500)
        .attr("width", function(d) { return x(0) - x(d['1_DAY']); });

        g.selectAll(".vline")
        .data(data)
      .enter().append("rect")
        .attr("class", "vline")
        .attr("x", width+10)
        .attr("y", function(d) { return y(d.area)-10; })  
        .attr("height", 1.8*y.bandwidth())
        .attr("width", 3);

          g.selectAll(".vline2")
        .data(data)
      .enter().append("rect")
        .attr("class", "vline2")
        .attr("x", width+20)
        .attr("y", function(d) { return y(d.area)-10; })  
        .attr("height", 1.8*y.bandwidth())
        .attr("width", 3);
      
}