
/*
    Prepares the data to use in the world map.
    It sorts the data by country and counts the amount of incidents.
    Values are scaled and the fill color is passed to datamaps.
*/
function prepareMapData(incidents, period) {

    // matching country to the amount of incidents and nesting them
    if (!period || period === "All-time") {
        var dataset = d3.nest()
            .key(function(d) {
                return d.victim.country[0];
            })
            .rollup(function(v) {
                return v.length
            })
            .object(incidents);
    } else {
        // single year data
        var dataset = d3.nest()
            .key(function(d) {
                return d.victim.country[0];
            })
            .rollup(function(v) {
                return v.length
            })
            .object(incidents.filter(function(d) {
                return d.timeline.incident.year == period
            }));
    }

    // get min and max incidents that occured
    var minValue = d3.min(d3.values(dataset));
    var maxValue = d3.max(d3.values(dataset));

    // represent higher amount of incidents with darker color
    var colorScale = d3.scale.log()
        .domain([minValue, maxValue])
        .range(["#CFD8DC", "#37474F"]);

    // scaling the fill color of the country based on the no. of incidents
    for (var key in dataset) {
        var iso = key;
        var value = dataset[key];
        dataset[iso] = {
            fillColor: colorScale(value),
            incidents: value
        };
    }

    return dataset;
}

/*
    Prepares the data to use in the bar chart.
    The if/else and key/rollup/entries pattern is necessary
    (for each of the visualisations) as the filtering each time is a
    little different. Different keys, different data.
*/
function prepareBarData(incidents, period, location) {

    // special case for when "World" is selected
    if (!location || location == "World") {
        if (!period || period == "All-time") {
            // world is selected and we need all-time data
            var dataset = d3.nest()
                .key(function(d) {
                    return d.victim.industry;
                })
                .rollup(function(v) {
                    return v.length;
                })
                .entries(incidents);
        } else {
            // world is selected and we need a specific year
            var dataset = d3.nest()
                .key(function(d) {
                    return d.victim.industry;
                })
                .rollup(function(v) {
                    return v.length;
                })
                .entries(incidents.filter(function(d) {
                    return d.timeline.incident.year == period;
                }));
        }
    } else {
        if (period == "All-time") {
            // a country is selected and we need data for all-time
            var dataset = d3.nest()
                .key(function(d) {
                    return d.victim.industry;
                })
                .rollup(function(v) {
                    return v.length;
                })
                .entries(incidents.filter(function(d) {
                    return d.victim.country == location;
                }));
        } else {
            // a country is selected and we need data for a specific year
            var dataset = d3.nest()
                .key(function(d) {
                    return d.victim.industry;
                })
                .rollup(function(v) {
                    return v.length;
                })
                .entries(incidents.filter(function(d) {
                    return d.victim.country == location && d.timeline.incident.year == period;
                }));
        }
    }

    return dataset;
}

/*
    Prepares the data to use in the heat map.
    Sorts the data by country, then by year and counts the incidents for each
    industry linked to the cause of the incident.
*/
function prepareHeatData(incidents, period, location) {
    // case for when "World" is selected or first page load
    if (!location || location == "World") {
        if (!period || period == "All-time") {
            // world is selected and we need all-time data
            var dataset = d3.nest()
                .key(function(d) {
                    return d.country;
                })
                .key(function(d) {
                    return d.year;
                })
                .object(incidents);
        } else {
            // world is selected and we need a specific year
            var dataset = d3.nest()
                .key(function(d) {
                    return d.country;
                })
                .key(function(d) {
                    return d.year;
                })
                .object(incidents.filter(function(d) {
                    return d.year == period;
                }));
        }
    } else {
        if (period == "All-time") {
            // a country is selected and we need all-time data
            var dataset = d3.nest()
                .key(function(d) {
                    return d.country;
                })
                .object(incidents.filter(function(d) {
                    return d.country == location;
                }));
            return dataset[location];
        } else {
            // a country is selected and we need data for a specific year
            var dataset = d3.nest()
                .key(function(d) {
                    return d.country;
                })
                .key(function(d) {
                    return d.year;
                })
                .object(incidents.filter(function(d) {
                    return d.country == location && d.year == period;
                }));
        }
    }
    // in case country/period does not exist in dataset, catch error
    try {
        return dataset[location][period];

    } catch (err) {
        return [];
    }
}

/*
    Prepares the data to use in the pie chart.
    Sorts the data by asset and counts the amount of incidents.
    Please note that sometimes an incident involves more than one asset.
    This filter only grabs the first one as this is the primary involved asset.
*/
function preparePieData(incidents, period, location) {
    // case for when "World" is selected or first page load
    if (!location || location == "World") {
        if (!period || period === "All-time") {
            // world is selected and we need all-time data
            var dataset = d3.nest()
                .key(function(d) {
                    return d.asset.assets[0].variety;
                })
                .rollup(function(v) {
                    return v.length;
                })
                .entries(incidents);
        } else {
            // world is selected and we need a specific year
            var dataset = d3.nest()
                .key(function(d) {
                    return d.asset.assets[0].variety;
                })
                .rollup(function(v) {
                    return v.length;
                })
                .entries(incidents.filter(function(d) {
                    return d.timeline.incident.year == period;
                }));
        }
    } else {
        if (period == "All-time") {
            // a country is selected and we need all-time data
            var dataset = d3.nest()
                .key(function(d) {
                    return d.asset.assets[0].variety;
                })
                .rollup(function(v) {
                    return v.length;
                })
                .entries(incidents.filter(function(d) {
                    return d.victim.country == location;
                }));
        } else {
            // a country is selected and we need data for a specific year
            var dataset = d3.nest()
                .key(function(d) {
                    return d.asset.assets[0].variety;
                })
                .rollup(function(v) {
                    return v.length;
                })
                .entries(incidents.filter(function(d) {
                    return d.victim.country == location && d.timeline.incident.year == period;
                }));
        }
    }

    return dataset;
}

/*
    Implements the tooltip functionality while hovering over the pie chart.
*/
function tooltipMovePie(d) {
    // shows asset type and nr. of incidents
    d3.select("#tooltip")
        .style("left", d3.event.pageX - 25 + "px")
        .style("top", d3.event.pageY + 10 + "px")
        .style("opacity", 1)
        .html("<b>" +
            "Asset: " + "</b>" + d.data.key +
            "</br>" + "<b>" + "No. of Incidents: " + "</b>" +
            d.data.value)
}

/*
    Implements the tooltip functionality while hovering over the heat map.
*/
function tooltipMoveHeat(d) {
    // shows industry, incident cause and incident count
    d3.select("#tooltip")
        .style("left", d3.event.pageX - 25 + "px")
        .style("top", d3.event.pageY + 10 + "px")
        .style("opacity", 1)
        .html("<b>" +
            "Industry: " + "</b>" + d.industry +
            "</br>" + "<b>" + "Caused by: " + "</b>" +
            d.action + "</br>" + "<b>" + "No. of Incidents: " + "</b>" + d.value + "</b>")
}

/*
    Hides the tooltip.
*/
function tooltipOut(d) {
    d3.select("#tooltip")
        .style("opacity", 0);
}

/*
    Rounds floating numbers.
*/
function makeWholeNumber(input) {
    var f = d3.format(".0f")
    return f(input);
}

/*
    Sorts data from highest to lowest value.
*/
function sortHighestLowest(data) {
    data.sort(function(a, b) {
        return b.value - a.value;
    });
}

/*
    Sorts data from lowest to Highest value.
*/
function sortLowestHighest(data) {
    data.sort(function(a, b) {
        return a.value - b.value;
    });
}

/*
    When no data is available for a selected country it shows the nodata-alert
    and hides it again after a certain delay.
*/
function showNoDataError() {
    // get the current selected country
    var country = $("[name='country'] :selected").text();

    // set the dynamic error message
    $("#nodata-alert").html("<p>No data available for <b>" + country + "</b>\
     during the selected time period, charts not updated</p>")

    // smoothly fade in the error message
    $("#nodata-alert").fadeIn();

    // show error for 4 seconds and hide it again, fading it out
    $("#nodata-alert").delay(4000).fadeOut(400, function() {
        $(this).hide();
    });
}
