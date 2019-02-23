var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 30,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper and append an SVG group that will hold our chart
var svg = d3.select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Data
d3.csv("assets/data/data.csv")
  .then(function(newsData) {

    // Parse 
    newsData.forEach(function(data) {
      data.income = +data.income;
      data.obesity = +data.obesity;
    });

    // Scales
    var xLinearScale = d3.scaleLinear()
      .domain([35000, d3.max(newsData, d => d.income)])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([20, d3.max(newsData, d => d.obesity)])
      .range([height, 0]);

    // Axis
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    // Start visuals
    var circlesGroup = chartGroup.selectAll("circle")
    .data(newsData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.income))
    .attr("cy", d => yLinearScale(d.obesity))
    .attr("r", "15")
    .attr("fill", "lightblue")
    .attr("opacity", ".5");

    // Tool Tip
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .style("background", "#bebebe")
      .html(function(d) {
        return (`${d.state}<br>Income: $ ${d.income}<br>Obese: ${d.obesity}%`);
      });

    chartGroup.call(toolTip);
    
    // State icons
    chartGroup.append("text")
        .style("text-anchor", "middle")
        .style("font-size", "12px")
        .selectAll("tspan")
        .data(newsData)
        .enter()
        .append("tspan")
            .attr("x", function(data) {
                return xLinearScale(data.income);
            })
            .attr("y", function(data) {
                return yLinearScale(data.obesity);
            })
            .text(function(data) {
                return data.abbr
            });

    // Mouseover rules
    circlesGroup.on("mouseover", function (d) {
            toolTip.show(d, this);
        })

    circlesGroup.on("mouseout", function (d, i) {
            toolTip.hide(d);
        });

    // Labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Obese (%)");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("Household Income (Median)");
  });