
// Getting references
// var selDataset = document.getElementById("selDataset");
// var metadatapanel = document.getElementById("sample-metadata");
// var piec = document.getElementById("pie");
// var bubbles = document.getElementById("bubble");

function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`
    var metadatapanel = document.getElementById("sample-metadata");
    // Use `.html("") to clear any existing metadata
    metadatapanel.innerHTML = '';
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    for(var key in data) {
            h6tag = document.createElement("h6");
            h6Text = document.createTextNode(`${key}: ${data[key]}`);
            h6tag.append(h6Text);
            metadatapanel.appendChild(h6tag);
        }
    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
    
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
    var labels = sampleData[0]['otu_ids'].map(function(item) {
        return otuData[item]
    // @TODO: Build a Bubble Chart using the sample data
    var bubblesLayout = {
        margin: { t: 0 },
        hovermode: 'closest',
        xaxis: { title: 'OTU ID' }
    };
    var bubblesData = [{
        x: sampleData[0]['otu_ids'],
        y: sampleData[0]['sample_values'],
        text: labels,
        mode: 'markers',
        marker: {
            size: sampleData[0]['sample_values'],
            color: sampleData[0]['otu_ids'],
            colorscale: "Earth",
        }
    }];
    var bubbles = document.getElementById('bubble');
    Plotly.plot(bubbles, bubblesData, bubblesLayout);
    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
    console.log(sampleData[0]['sample_values'].slice(0, 10))
    var piecData = [{
        values: sampleData[0]['sample_values'].slice(0, 10),
        labels: sampleData[0]['otu_ids'].slice(0, 10),
        hovertext: labels.slice(0, 10),
        hoverinfo: 'hovertext',
        type: 'pie'
    }];
    var piecLayout = {
        margin: { t: 0, l: 0 }
    };
    var piec = document.getElementById('pie');
    Plotly.plot(piec, piecData, piecLayout);
};
}

function getData(sample, callback) {
    Plotly.d3.json(`/samples/${sample}`, function(error, sampleData) {
        if (error) return console.warn(error);
        Plotly.d3.json('/otu', function(error, otuData) {
            if (error) return console.warn(error);
            callback(sampleData, otuData);
        });
    });
    Plotly.d3.json(`/metadata/${sample}`, function(error, metaData) {
        if (error) return console.warn(error);
        updateMetaData(metaData);
    })
}
function getOptions() {
    var selDataset = document.getElementById('selDataset');
    Plotly.d3.json('/names', function(error, sampleNames) {
        for (var i = 0; i < sampleNames.length;  i++) {
            var currentOption = document.createElement('option');
            currentOption.text = sampleNames[i];
            currentOption.value = sampleNames[i]
            selDataset.appendChild(currentOption);
        }
        getData(sampleNames[0], buildCharts);
    })
}
function optionChanged(newSample) {
    getData(newSample, updateCharts);
}
function init() {
    getOptions();
}

// Initialize the dashboard
init();
