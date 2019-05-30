function drawRightChart(domId, data, chartHeight){
$(domId).empty();


var svg = d3.select(domId);
svg.attr("height", chartHeight);
var margin = {top: 20, right: 20, bottom: 30, left: 80};
var width = +svg.attr("width") - margin.left - margin.right;
var height = +svg.attr("height") - margin.top - margin.bottom;
  
var tooltip = d3.select("body").append("div").attr("class", "toolTip");
  
var x = d3.scaleLinear().range([0, width]);
var y = d3.scaleBand().range([0, height]);

data.sort(function(a, b) {
     if(window.isDayMode){
            adate=Date.parse(a.label)
            bdate=Date.parse(b.label)
            return adate-bdate;
     }
     else{
        return b.label.slice(-2)-a.label.slice(-2);
      }
    });
    
var g = svg.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  
  //	data.sort(function(a, b) { return a.value - b.value; });
  
  	x.domain([0, d3.max(data, function(d) { return Math.abs(d['7_DAY_PACE']); })]);
    y.domain(data.map(function(d) { return d.label; })).padding(0.5);

    g.append("g")
        .attr("class", "x axis")
       	.attr("transform", "translate(0," + height + ")")
      	.call(d3.axisBottom(x).ticks(5).tickFormat(function(d) { return parseInt(d*100)+'%'; }).tickSizeInner([-height]));

    g.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(y));

    g.selectAll(".right")
        .data(data)
      .enter().append("rect")
        .attr("class", "right")
        .style("fill", function(d) { return d.YOY_CAP>0? '#D99694': '#92D050';})
        .attr("x", 0)
        .attr("height", y.bandwidth())
        .attr("y", function(d) { return y(d.label); })
        .on("mouseover", function(d){
            tooltip
              .style("left", d3.event.pageX - 50 + "px")
              .style("top", d3.event.pageY - 70 + "px")
              .style("display", "inline-block")
              .html((d.label) + "<br>"+ parseInt(d['7_DAY_PACE']*100)+'%');
        }) 
        .on("mouseout", function(d){ tooltip.style("display", "none");})  
        .attr("width", 0)
        .transition()
        .duration(1500)
        .attr("width", function(d) { return x(Math.abs(d['7_DAY_PACE'])); });       

}