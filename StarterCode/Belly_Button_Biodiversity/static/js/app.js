function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`
    var panel = d3.select("#sample-metadata").node().value;

  

 
    // Use `.html("") to clear any existing metadata
    d3.select("#sample-metadata").node().value = "";

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.


    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}

function buildCharts(sample) {
  console.log("buildCharts")

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  // Plot the default route once the page loads
  var defaultURL = "/samples/" + sample;

     // @TODO: Build a Pie Chart
    d3.json(defaultURL).then(function(data) {
      var data1 = {
        "values": data.otu_ids,
        "labels": data.sample_values,
        "hoverinfo": data.otu_labels,
        "type": "pie"    
     }
      data1["values"] = data1["values"].slice(0, 10);
      data1["labels"] = data1["labels"].slice(0, 10);
      data1["hoverinfo"] = data1["hoverinfo"].slice(0, 10);
      console.log(data1);
      var layout = { title: "Pie chart"};
      Plotly.newPlot("pie", [data1], layout);
    // });
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).

     // @TODO: Build a Bubble Chart using the sample data
     var size = data.sample_values 
     var data2 = {
        "x": data.sample_values,
        "y": data.otu_ids,
        "text": data.otu_labels,
        "mode": "markers",
        "marker": {
          color: data.otu_ids,
          size: size,
          sizemode: 'area',
          symbol: 'circle'
        },          
        "type": "scatter"   
      }
      Plotly.newPlot("bubble", [data2]);
    });

}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    // buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
