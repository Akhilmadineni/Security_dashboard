
/*
    Updates the world map and the legend with the new data.
*/
function refreshWorldmap(incidents, settings, period) {

    // world map settings
    var svg = settings.svg;
    var legendsvg = settings.legendsvg
    var worldMap = settings.worldMap;
    var xAxis = settings.xAxis;
    var xScale = settings.xScale;
    var maxValue = d3.max(d3.entries(incidents), function(d) {
        return d.value.incidents;
    })

    // updating the legend
    xScale.domain([0, maxValue]);
    xAxis.scale(xScale);
    legendsvg.select(".legendAxis")
        .transition()
        .duration(900)
        .call(xAxis);

    // hacky solution for a bug in datamaps, setting the data to empty object
    // reference: https://github.com/markmarkoh/datamaps/issues/269
    worldMap.options.data = {}
    worldMap.updateChoropleth(incidents, {
        reset: true
    });
}

/*
    Draws (and updates) the bar chart with the new data.
*/
function refreshBarchart(incidents, settings) {

    // set up data and settings
    var dataset = incidents;
    var svg = settings.svg;
    var margin = settings.margin;
    var width = settings.width;
    var height = settings.height;
    var x = settings.x;
    var y = settings.y;
    var xAxis = settings.xAxis;
    var yAxis = settings.yAxis;

    // bar colors
    var colorScale = d3.scale.quantize()
        .domain([0, dataset.length])
        .range(["#CFD8DC", "#B0BEC5", "#90A4AE", "#78909C", "#607D8B",
            "#546E7A", "#455A64", "#37474F"
        ]);

    // longer bars on top to shorter bars at the bottom
    sortLowestHighest(dataset)

    // set new domain data for scales
    settings.x
        .domain([0, d3.max(dataset, function(d) {
            return d.value;
        })]);
    settings.y
        .domain(dataset.map(function(d) {
            return d.key;
        }));

    // add/update the y axis with its style
    svg.select(".yAxis")
        .transition()
        .duration(700)
        .call(yAxis)
        .selectAll('text')
        .style("fill", "#84868e")
        .style('text-anchor', 'end');

    // add/update the x axis with its style
    svg.select(".xAxis")
        .transition()
        .duration(700)
        .call(xAxis)
        .style("stroke", "#84868e")
        .style("fill", "none")
        .style("stroke-width", 0.75)
        .selectAll("text")
        .attr("stroke", "none")
        .attr("fill", "#84868e");

    // set the color scale for the bar fill
    colorScale.domain([0, dataset.length]);

    // create bar groups and bind new data to them
    var bars = svg.selectAll("g.bars")
        .data(dataset, function(d) {
            return d.key
        });

    var newBars = bars
        .enter()
        .append("g")
        .attr("class", "bars");

    // add rectangles with data
    newBars.insert("rect")
        .attr("class", "bar")
        .attr("x", 0)
        .attr("opacity", 0)
        .attr("height", y.rangeBand())
        .attr("width", function(d) {
            return x(d.value);
        });

    // add value labels at the end of the bars
    newBars.append("text")
        .attr("class", "label")
        .attr("y", y.rangeBand() / 2)
        .attr("x", function(d) {
            return x(d.value) + 3;
        })
        .attr("opacity", 0)
        .attr("dy", ".35em")
        .attr("dx", "0.5em")
        .style("fill", "#84868e")
        .text(function(d) {
            return d.value;
        });

    // update bar widths
    bars.select(".bar").transition()
        .duration(300)
        .attr("width", function(d) {
            return x(d.value);
        })
        .attr("height", y.rangeBand())
        .style('fill', function(d, i) {
            return colorScale(i);
        })
        .attr("opacity", 1);

    // update text labels next to bar
    bars.select(".label").transition()
        .duration(300)
        .attr("x", function(d) {
            return x(d.value) + 3;
        })
        .attr("y", y.rangeBand() / 2)
        .attr("opacity", 1)
        .tween("text", function(d) {
            var i = d3.interpolate(+this.textContent.replace(/\,/g, ''), +d.value);
            return function(t) {
                this.textContent = Math.round(i(t));
            };
        });

    // fade out and remove old elements
    bars.exit().transition()
        .style("opacity", "0")
        .attr("transform", "translate(0," +
            (height + margin.top + margin.bottom) + ")")
        .remove();

    // delay for stack down transition
    var delay = function(d, i) {
        return 200 + i * 30;
    };

    // place the new bars with an animation; a stack growing down
    bars.transition()
        .delay(delay)
        .duration(600)
        .attr("transform", function(d) {
            return "translate(0," + y(d.key) + ")";
        });
}

/*
    Updates the pie chart and the legend with the new data.
*/
function refreshPiechart(incidents, settings) {

    // settings for pie chart
    var colorScale = settings.colorScale;
    var radius = settings.radius;
    var height = settings.height;
    var width = settings.width;
    var offset = settings.offset;
    var arc = settings.arc;
    var arcOver = settings.arcOver;
    var arcs = settings.arcs;
    var svg = settings.svg;
    var pie = settings.pie.value(function(d) {
        return d.value;
    });

    // sort the data
    sortHighestLowest(incidents)

    // needed later to calculate slice percentages
    var totalValue = d3.sum(incidents, function(d) {
        return d.value;
    })

    // reset the domain for colorScale
    colorScale.domain([1, d3.max(incidents, function(d) {
        return d.value
    })]);

    // bind data to yet to be made groups of slices
    newSlices = d3.select(".piechart")
        .select("g")
        .selectAll("g.slice")
        .data(pie(incidents));

    // append new groups that hold the path/text combination
    slice = newSlices
        .enter()
        .append("svg:g")
        .attr("class", "slice");

    // append new paths as needed
    slice.append("svg:path")
        .attr("fill", "#CFD8DC")
        .transition()
        .duration(600)
        .attr("d", arc)
        .attr("fill", function(d) {
            return colorScale(d.value);
        })
        .each(function(d) {
            this._current = d;
        });

    // remove old data/elements
    newSlices.exit().remove();
    svg.selectAll("text").remove();

    // update the old slices with the new data
    var oldSlices = svg.selectAll("g.slice").data(pie(incidents));

    oldSlices.select("path")
        .attr("d", arc)
        .transition()
        .duration(600)
        .attr("fill", function(d) {
            return colorScale(d.value);
        });

    // center the new percentage labels inside the slices
    oldSlices.append("svg:text")
        .attr("transform", function(d) {
            d.innerRadius = 0;
            d.outerRadius = radius;
            return "translate(" + arc.centroid(d) + ")";
        })
        .attr("opacity", 0)
        .attr("font-size", "0.8em")
        .attr("fill", "#FFF")
        .attr("text-anchor", "middle")
        .transition()
        .duration(1000)
        .attr("opacity", 1)
        .text(function(d, i) {
            if ((d.data.value / totalValue * 100) < 5) {
                return ""
            } else {
                return makeWholeNumber(d.data.value / totalValue * 100) + "%";
            }
        });

    // reinitialize the tooltip on the slices
    oldSlices
        .on("mousemove", tooltipMovePie)
        .on("mouseout", tooltipOut);

    // redefine on-hover effect (arcs out the slice when hovered on)
    svg.selectAll("path")
        .on("mouseover", function(d) {
            d3.select(this)
                .transition()
                .duration(400)
                .attr("d", arcOver(d))
        })
        .on("mouseout", function(d) {
            d3.select(this)
                .transition()
                .duration(400)
                .attr("d", arc)
        });

    // updating legend with enter/update/exit pattern
    var legend = d3.select(".legendGroup")
        .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")")
        .selectAll(".legend")
        .data(pie(incidents));

    // bind new data to the legend
    var legendE = legend
        .enter()
        .append('g')
        .attr("class", "legend")
        .attr("transform", function(d, i) {
            return "translate(" + (-height / 2) + "," + (i * 20 - offset) + ")";
        })

    // set color for the new rects
    legendE.append("rect")
        .attr("width", 15)
        .attr("height", 15)
        .attr("stroke", "#84868e")
        .attr("fill", function(d, i) {
            return colorScale(d.data.value);
        });

    // set text labels for the new rects
    legendE.append("text")
        .text(function(d) {
            return d.data.key;
        })
        .style("font-size", "0.8em")
        .style("fill", "#84868e")
        .attr("y", 13)
        .attr("x", 20);

    // update the old rects with new color
    legend.select("rect")
        .attr("fill", function(d, i) {
            return colorScale(d.data.value);
        });

    // update the old text labels we new names
    legend.select("text")
        .text(function(d) {
            return d.data.key;
        })

    // remove old elements
    legend.exit().remove();

}

/*
    Updates the heat map and the legend with the new data.
*/
function refreshHeatmap(induvstype, settings) {

    // heatmap settings
    var colorScale = settings.colorScale;
    var svg = settings.svg;
    var legendLinear = settings.legendLinear;
    var linear = settings.linear;

    // redefine color domain for the new data
    colorScale.domain([1, d3.max(induvstype, function(d) {
        return d.value
    })])

    // bind new data, fill color and update heat map
    svg.selectAll("rect")
        .data(induvstype)
        .transition()
        .duration(1000)
        .attr('fill', function(d) {
            if (d.value > 0) {
                return colorScale(d.value);
            } else {
                return "#CFD8DC";
            }
        });

    // set new domain for legend
    linear.domain([0, d3.max(induvstype, function(d) {
            return d.value
        })])
        .nice();

    // update legend
    svg.select(".legendLinear")
        .call(legendLinear);

}
