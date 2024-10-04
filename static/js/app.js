// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata fields
    let metadata = data.metadata;

    // Filter the metadata for the object with the desired sample number
    let result = metadata.filter(obj => obj.id == sample)[0];

    // Use d3 to select the panel with id of `#sample-metadata`
    let panel = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    panel.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    Object.entries(result).forEach(([key, value]) => {
      panel.append("h6").text(`${key.toUpperCase()}: ${value}`);
  });
  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let samples = data.samples;

    // Filter the samples for the object with the desired sample number
    let result = samples.filter(obj => obj.id === sample)[0];

    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids = result.otu_ids;
    let otu_labels = result.otu_labels;
    let sample_values = result.sample_values;

    // Build a Bubble Charts 
    let bubbleTrace = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: "markers",
      marker: {
          size: sample_values,
          color: otu_ids,
          colorscale: "Earth"
      }
  };
  let bubbleLayout = {
    title: "Bacteria Cultures Per Sample",
    xaxis: { title: "OTU ID" },
    yaxis: { title: "Number of Bacteria" },
    showlegend: false
};

    // Render the Bubble Chart
    Plotly.newPlot("bubble", [bubbleTrace], bubbleLayout);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    let yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();

    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    let barTrace = {
      x: sample_values.slice(0, 10).reverse(),
      y: yticks,
      text: otu_labels.slice(0, 10).reverse(),
      type: "bar",
      orientation: "h"
  };

  let barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      xaxis: {title: "Number of Bacteria"},
      margin: { t: 30, l: 150 }
  };

    // Render the Bar Chart

    Plotly.newPlot("bar", [barTrace], barLayout);
  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let sampleNames = data.names;

    // Use d3 to select the dropdown with id of `#selDataset`
    let dropdown = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.

    sampleNames.forEach((sample) => {
      dropdown.append("option").text(sample).property("value", sample);
  });

    // Get the first sample from the list
    let firstSample = sampleNames[0];

    // Build charts and metadata panel with the first sample
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Function for event listener
function optionChanged(newSample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
        
    // Get the samples data
    let samples = data.samples;
    
    // Filter the samples for the object with the desired sample number
    let result = samples.filter(obj => obj.id === sample)[0];
    
    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids = result.otu_ids;
    let otu_labels = result.otu_labels;
    let sample_values = result.sample_values;
  // Build charts and metadata panel each time a new sample is selected
  let top10_sample_values = sample_values.slice(0, 10).reverse();
  let top10_otu_ids = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
  let top10_otu_labels = otu_labels.slice(0, 10).reverse();

  let barTrace = {
      x: Top10_Bacteria_Cultures_Found,
      y: Number_of_Bacteria,
      text: top10_otu_labels,
      type: "bar",
      orientation: "h"
  };

  let barLayout = {
      title: "Top 10 OTUs Found",
      margin: { t: 30, l: 150 }
  };

  Plotly.newPlot("bar", [barTrace], barLayout);

  // BUILD THE BUBBLE CHART
  let bubbleTrace = {
      x: OTU_ID,
      y: Number_of_Bacteria,
      text: otu_labels,
      mode: "markers",
      marker: {
          size: sample_values,
          color: otu_ids,
          colorscale: "Earth"
      }
  };

  let bubbleLayout = {
      title: "OTU ID vs. Sample Values",
      xaxis: { title: "OTU ID" },
      yaxis: { title: "Sample Values" },
      showlegend: false
  };

  Plotly.newPlot("bubble", [bubbleTrace], bubbleLayout);
});
}
// Function for event listener (when the dropdown value changes)
function optionChanged(newSample) {
  // Update the charts and metadata panel each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
