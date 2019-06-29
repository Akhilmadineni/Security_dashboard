


window.onload = function() {
    // queue up the data sets and pass them to the main function
    var q = d3.queue()
        .defer(d3.json, "src/data/incidentDataset.json")
        .defer(d3.json, "src/data/heatMapDataset.json")
        .defer(d3.json, "src/data/heatMapDatasetAlltimeCountries.json")
        .await(castDashboard);

    // dynamically set position of the no data error message after page load
    var navbarHeight = $('.navbar').outerHeight();
    $('#nodata-alert').css('margin-top', navbarHeight);
}

/*
    Contains the casting funtions for each of the visualisations.
    Inits the first draw and then monitors for interactions to update the
    existing charts with new data.
*/
function castDashboard(error, incidents, induvstype, induvstype_alltime) {

    // catch loading errors
    if (error) throw error;

    // setup and init world map
    var mapSettings = castWorldMap(incidents);

    // setup the bar chart data and init the first draw
    var barData = prepareBarData(incidents);
    var barSettings = setupBarchart("#barchart");
    refreshBarchart(barData, barSettings)

    // setup and init the heat map
    var heatData = prepareHeatData(induvstype, "All-time", "World");
    var heatSettings = castHeatmap(heatData);

    // setup and init pie chart
    var pieData = preparePieData(incidents);
    var pieSettings = castPiechart(pieData);

    // make sure on page load/refresh All-time is the default dropdown value
    var dropdown = document.getElementById("inlineFormCustomSelect");
    dropdown.selectedIndex = "All-time";

    // updates the visualisations when using the dropdown menu (period)
    d3.select("#inlineFormCustomSelect")
        .on("change", function() {
            triggerUpdate()
        });

    // updates the visualisations when using the search bar (country)
    $("[name='country']").on('select2:select', function(e) {
        triggerUpdate()
    });

    /*
        Uses datamaps to draw a world map and legend with the specified dataset.
        Returns an object with settings that are used by refreshWorldmap().
    */
    function castWorldMap(incidents) {

        // matching country to the amount of incidents and nesting them
        var dataset = prepareMapData(incidents);
        var maxValue = d3.max(d3.entries(dataset), function(d) {
            return d.value.incidents;
        })

        // calculate svg width based on width of parent container
        var titleDimensions = document.querySelector('h3')
            .getBoundingClientRect();
        var divWidth = titleDimensions.right - titleDimensions.left;

        // calculate svg height based on heigh of bootstrap row
        var row = d3.select(".row");
        var rowDimensions = row.node().getBoundingClientRect();
        var rowHeight = rowDimensions.height * 0.85;

        // based on: http://jsbin.com/kuvojohapi/1/edit?html,output
        var worldMap = new Datamap({
            element: document.getElementById("worldmap"),
            fills: {
                defaultFill: '#ddd'
            },
            height: rowHeight,
            width: divWidth,
            data: dataset,
            projection: "mercator",
            geographyConfig: {
                borderColor: '#FFF',
                highlightBorderWidth: 2,
                highlightFillColor: function(geo) {
                    return geo['fillColor'] || '#ddd';
                },
                highlightBorderColor: '#FFF',
                popupTemplate: function(geo, data) {
                    if (!data || !data.incidents) {
                        return;
                    }
                    return ['<div class="hoverinfo">',
                        '<strong>', geo.properties.name, '</strong>',
                        '<br>Incidents: <strong>', data.incidents, '</strong>',
                        '</div>'
                    ].join('');
                }
            },
            // clicking a country fills in the search bar and updates the data
            done: function(datamap) {
                datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
                    $("[name='country']").val(geography.id);
                    $("[name='country']").trigger('change');
                    triggerUpdate()
                });
            }
        });

        // linear gradient legend
        var svg = d3.select(".datamap")
        var mapDim = svg.node().getBoundingClientRect();
        var mapHeight = mapDim.height;
        var mapWidth = mapDim.width;
        var defs = svg.append("defs");
        var legendWidth = divWidth * 0.3;
        var legendHeight = 12;

        // linear gradient specification
        var linearGradient = defs.append("linearGradient")
            .attr("id", "linear-gradient")
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "100%")
            .attr("y2", "0%");

        // beginning of legend is grey to represent no data
        linearGradient.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", "#DDD");

        // linear gradient continues with light blue-grey
        linearGradient.append("stop")
            .attr("offset", "5%")
            .attr("stop-color", "#CFD8DC");

        // to dark blue-grey which represents the max value
        linearGradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", "#37474F");

        // color legend container
        var legendsvg = svg.append("g")
            .attr("class", "legendWrapper")
            .attr("transform", "translate(" + (divWidth / 2 - 10) + "," + (mapHeight - 50) + ")");

        // draw linear gradient rectangle
        legendsvg.append("rect")
            .attr("class", "legendRect")
            .attr("x", -legendWidth / 2)
            .attr("y", 10)
            .attr("width", legendWidth)
            .attr("height", legendHeight)
            .style("fill", "url(#linear-gradient)");

        // legend title
        legendsvg.append("text")
            .attr("class", "legendTitle")
            .style("fill", "#84868e")
            .style("font-size", "0.9em")
            .style("text-anchor", "middle")
            .attr("x", 0)
            .text("No. of Incidents");

        // assign axis class and position in the middle of the gradient bar
        legendsvg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + (-legendWidth / 2) + "," + (10 + legendHeight) + ")");

        // set scale for x axis
        var xScale = d3.scale.linear()
            .range([-legendWidth / 2, legendWidth / 2])
            .domain([0, maxValue]);

        // specify axis properties
        var xAxis = d3.svg.axis()
            .orient("bottom")
            .tickPadding(17)
            .ticks(5)
            .tickSize(0)
            .tickFormat(d3.format(".0f"))
            .scale(xScale);

        // add the x axis to svg
        legendsvg.append("g")
            .attr("class", "legendAxis")
            .attr("transform", "translate(0," + (10) + ")")
            .call(xAxis);

        // export map settings for update function
        var settings = {
            svg: svg,
            legendsvg: legendsvg,
            worldMap: worldMap,
            xScale: xScale,
            xAxis: xAxis

        }

        return settings;

    }

    /*
        Creates the necessary elements for a bar chart (svg, dimensions, axis)
        and returns the settings. The bar chart itself is drawn and updated
        using an update pattern by refreshBarchart().
    */
    function setupBarchart(target) {

        //set up svg margin - we'll need plenty of room on the left for labels
        var margin = {
            top: 10,
            right: 50,
            bottom: 30,
            left: 110
        };

        // grab width of the title so we can get a dynamic width for the svg
        var titleDimensions = document.querySelector('#barchartTitle')
            .getBoundingClientRect();
        var titleWidth = titleDimensions.right - titleDimensions.left;

        // similar, grab the height of the datamap so it matches
        var worldmapheight = d3.select(".datamap")
            .attr("height")

        // dimensions for the bar chart
        var width = titleWidth - margin.left - margin.right,
            height = worldmapheight - margin.top - margin.bottom;

        // canvas for horizontal bar chart
        var svg = d3.select("#barchart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // x scale
        var x = d3.scale.linear()
            .range([0, width]);

        // y scale, reverse for horizontal bar chart
        var y = d3.scale.ordinal()
            .rangeRoundBands([height, 0], .1);

        // make y axis to show bar names
        var yAxis = d3.svg.axis()
            .scale(y)
            .tickSize(0)
            .orient("left");

        // x axis that show amount of incidents
        var xAxis = d3.svg.axis()
            .orient("bottom")
            .ticks(5)
            .scale(x);

        // y axis
        var gy = svg.append("g")
            .attr("class", "yAxis");

        // x axis
        var gx = svg.append("g")
            .attr("class", "xAxis")
            .attr("transform", "translate(" + 0 + "," + height + ")");

        // export bar chart settings for update function
        var settings = {
            margin: margin,
            width: width,
            height: height,
            svg: svg,
            x: x,
            y: y,
            yAxis: yAxis,
            xAxis: xAxis
        }

        return settings;


    }

    /*
        Initializes a heat map with its respective elements and legend.
        Returns the settings of the heat map, in turn used by refreshHeatmap().
    */
    function castHeatmap(induvstype) {

        // calculate svg width based on width of parent container
        var titleDimensions = document.querySelector('h3')
            .getBoundingClientRect();
        var divWidth = titleDimensions.right - titleDimensions.left;

        // calculate svg height based on heigh of bootstrap row
        var row = d3.select("#worldmap");
        var rowDimensions = row.node().getBoundingClientRect();
        var rowHeight = rowDimensions.height * 0.75;

        // heatmap dimensions
        var margin = {
            top: 120,
            right: 0,
            bottom: 0,
            left: 110
        }
        var width = divWidth - margin.left - margin.right;
        var height = rowHeight - margin.top - margin.bottom;
        var gridSize = Math.floor(width / 22);
        var legendElementWidth = gridSize * 1.5;
        var cellSize = gridSize - 1;

        // cell colors
        var colors = ["#B0BEC5", "#37474F"];

        // x and y labels
        var attacks = ['Misuse', 'Error', 'Hacking', 'Physical', 'Unknown',
            'Malware', 'Social', 'Environmental'
        ];
        var industries = ["Agriculture", "Mining", "Utilities",
            "Construction", "Manufacturing", "Wholesale", "Retail",
            "Transportation", "Information", "Finance", "Real Estate",
            "Professional", "Management", "Administrative", "Educational",
            "Health Care", "Entertainment", "Accommodation", "Other Services",
            "Public", "Unknown"
        ];

        // scale industry labels
        var x = d3.scale.ordinal()
            .domain(industries)
            .rangeBands([0, industries.length * gridSize]);

        // x axis
        var xAxis = d3.svg.axis()
            .scale(x)
            .tickFormat(function(d) {
                return d;
            })
            .orient("top");

        // scale attack labels
        var y = d3.scale.ordinal()
            .domain(attacks)
            .rangeBands([0, attacks.length * gridSize]);

        // y axis
        var yAxis = d3.svg.axis()
            .scale(y)
            .tickFormat(function(d) {
                return d;
            })
            .orient("left");

        // colorscale for filling the heat cells
        var colorScale = d3.scale.log()
            .domain([1, d3.max(induvstype, function(d) {
                return d.value
            })])
            .range(colors);

        // heat map canvas
        var svg = d3.select("#heatmap").append("svg")
            .attr("class", "heatmap")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // adding the cells and binding data to them
        var cells = svg.selectAll('rect')
            .data(induvstype)
            .enter()
            .append('g')
            .append('rect')
            .attr('class', 'heatcell')
            .attr('width', cellSize)
            .attr('height', cellSize)
            .attr('y', function(d, i) {
                return y(d.action);
            })
            .attr('x', function(d, i) {
                return x(d.industry);
            })
            .attr('fill', function(d) {
                if (d.value > 0) {
                    return colorScale(d.value);
                } else {
                    return "#CFD8DC";
                }
            })
            .on("mousemove", tooltipMoveHeat)
            .on("mouseout", tooltipOut);

        // add the y axis to the svg
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .selectAll('text')
            .attr('font-size', '0.75em')
            .attr('fill', "#84868e");

        // add the x axis to the svg
        svg.append("g")
            .attr("class", "x axis")
            .call(xAxis)
            .selectAll('text')
            .attr('font-size', '0.75em')
            .attr('fill', "#84868e")
            .style("text-anchor", "start")
            .attr("dx", ".8em")
            .attr("dy", ".5em")
            .attr("transform", function(d) {
                return "rotate(-65)";
            });

        // making use of d3-legend
        var linear = d3.scale.linear()
            .domain([0, d3.max(induvstype, function(d) {
                return d.value
            })])
            .nice()
            .range(["#CFD8DC", "#37474F"]);

        // appending legend to heatmap svg
        svg.append("g")
            .attr("class", "legendLinear")
            .attr("transform", "translate(" + ((cellSize * 11) / 2) + "," + (height * 0.85) + ")");

        // setting legend properties
        var legendLinear = d3.legend.color()
            .shapeWidth(legendElementWidth)
            .shapePadding(3.5)
            .orient("horizontal")
            .labelFormat(d3.format(".0f"))
            .shapeHeight(10)
            .cells(6)
            .scale(linear);

        // placing legend on svg
        svg.select(".legendLinear")
            .attr("fill", "#84868e")
            .attr("font-size", "0.8em")
            .call(legendLinear);

        // give legend rectangles a border
        svg.selectAll(".swatch")
            .attr("stroke", "#84868e")

        // export heat map settings for update function
        var settings = {
            svg: svg,
            legendLinear,
            linear: linear,
            colorScale: colorScale
        }

        return settings;

    }

    /*
        Initializes a pie chart with its respective elements and legend.
        Returns the settings of the pie chart, in turn used by refreshPiechart()
    */
    function castPiechart(incidents) {

        // sort data from highest to lowest
        sortHighestLowest(incidents)

        // grab width of the title so we can get a dynamic width for the svg
        var titleDimensions = document.querySelector('#barchartTitle')
            .getBoundingClientRect();
        var titleWidth = titleDimensions.right - titleDimensions.left;

        // grab the height of the heatmap for equal height elements
        var heatmapHeight = d3.select(".heatmap").attr("height");

        // pie chart dimensions
        var margin = {
            top: 20,
            right: 0,
            bottom: 20,
            left: 0
        };
        var width = titleWidth;
        var height = heatmapHeight;
        var radius = (height / 2.25) - margin.top - margin.bottom;

        // used later on to calculate slice percentages
        var totalValue = d3.sum(incidents, function(d) {
            return d.value;
        })

        // colors to use for the slices
        var colorScale = d3.scale.log()
            .domain([1, d3.max(incidents, function(d) {
                return d.value
            })])
            .range(["#CFD8DC", "#455A64"]);

        // pie chart canvas
        var svg = d3.select('#piechart')
            .append("svg:svg")
            .data([incidents])
            .attr("class", "piechart")
            .attr("width", width)
            .attr("height", height)
            .append("svg:g")
            .attr("transform", "translate(" + (width / 1.55) + "," + (height / 2) + ")");

        // tooltip element
        d3.select("body")
            .append("div")
            .attr("id", "tooltip")
            .attr("class", "hidden");

        // get pie chart ready with the data
        var pie = d3.layout.pie().value(function(d) {
            return d.value;
        });

        // used to center the legend in the SVG
        var offset = 20 * pie(incidents).length / 2

        // mouse over animation which enlarges the selected slice
        var arcOver = d3.svg.arc()
            .outerRadius(radius + 10);

        // Declare an arc generator function
        var arc = d3.svg.arc()
            .outerRadius(radius);

        // select paths, use arc generator to draw
        var arcs = svg.selectAll("g.slice")
            .data(pie(incidents))
            .enter()
            .append("svg:g")
            .attr("class", "slice")
            .on("mousemove", tooltipMovePie)
            .on("mouseout", tooltipOut);

        // add slices with color based on value
        arcs.append("svg:path")
            .attr("d", arc)
            .attr("fill", function(d, i) {
                return colorScale(d.data.value);
            })
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

        // add a centered label to each slice
        arcs.append("svg:text")
            .attr("transform", function(d) {
                d.innerRadius = 0;
                d.outerRadius = radius;
                return "translate(" + arc.centroid(d) + ")";
            })
            .attr("font-size", "0.8em")
            .attr("fill", "#FFF")
            .attr("text-anchor", "middle")
            // add labels as percentages to slices big enough to show them
            .text(function(d, i) {
                if ((d.data.value / totalValue * 100) < 5) {
                    return ""
                } else {
                    return makeWholeNumber(d.data.value / totalValue * 100) + "%";
                }
            });

        // legend, centered to the left of the pie chart
        var legendG = d3.select(".piechart")
            .append("g")
            .attr("class", "legendGroup")
            .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")")
            .selectAll(".legend")
            .data(pie(incidents))
            .enter().append("g")
            .attr("transform", function(d, i) {
                return "translate(" + (-height / 2) + "," + (i * 20 - offset) + ")";
            })
            .attr("class", "legend");

        // make a matching color rect
        legendG.append("rect")
            .attr("width", 15)
            .attr("height", 15)
            .attr("stroke", "#84868e")
            .attr("fill", function(d, i) {
                return colorScale(d.data.value);
            });

        // add the text next to the rectangles
        legendG.append("text")
            .text(function(d) {
                return d.data.key;
            })
            .style("font-size", "0.8em")
            .style("fill", "#84868e")
            .attr("y", 13)
            .attr("x", 20);

        // export settings for update function
        var settings = {
            pie: pie,
            radius: radius,
            svg: svg,
            arcs: arcs,
            arc: arc,
            arcOver: arcOver,
            colorScale: colorScale,
            height: height,
            width: width,
            offset: offset
        }

        return settings;
    }

    /*
        Looks up the selected country and time period and updates all the
        necessary visualisations. If no data is available the user is informed.
    */
    function triggerUpdate() {
        // get values of the menus
        var country = $("[name='country']").val();
        var period = dropdown.options[dropdown.selectedIndex].value;

        // update data for all the visualisations
        var mapData = prepareMapData(incidents, period);
        var barData = prepareBarData(incidents, period, country);
        var pieData = preparePieData(incidents, period, country);

        // heat map has multiple datasets
        if (period === "All-time" && country != "World") {
            // dataset with all-time country stats, world excluded
            var heatData = prepareHeatData(induvstype_alltime, period, country);
        } else {
            // dataset with all-time world stats and country data by year
            var heatData = prepareHeatData(induvstype, period, country);
        }

        // if any of the data (e.g. barData, heatData) is empty, inform user
        if (barData.length === 0 || heatData.length === 0) {
            showNoDataError()
        } else {
            // update visualisations with new data
            refreshWorldmap(mapData, mapSettings, period)
            refreshBarchart(barData, barSettings)
            refreshHeatmap(heatData, heatSettings)
            refreshPiechart(pieData, pieSettings)
        }
    }
}
