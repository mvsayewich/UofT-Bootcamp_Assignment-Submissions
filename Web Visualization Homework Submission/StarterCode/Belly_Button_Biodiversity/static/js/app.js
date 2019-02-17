function buildMetaData(data) {
    // Reference to original element for sample metadata
    var Origin = document.getElementById("sample-metadata");
    // Clear any existing metadata
    Origin.innerHTML = '';
    // Loop through all of the keys in the json response and
    // create new metadata tags
    for(var key in data) {
        h6tag = document.createElement("h6");
        h6Text = document.createTextNode(`${key}: ${data[key]}`);
        h6tag.append(h6Text);
        Origin.appendChild(h6tag);
    }
}
function buildCharts(sampleData, otuData) {
    // Find the OTU Taxonomic Name
    var labels = sampleData[0]['otu_ids'].map(function(item) {
        return otuData[item]
    });
    // Bubble Chart
    var bubbleLayout = {
        margin: { t: 0 },
        hovermode: 'closest',
        xaxis: { title: 'OTU ID' }
    };
    var bubbleData = [{
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
    Plotly.plot(bubbles, bubbleData, bubbleLayout);
    // Pie Chart
    console.log(sampleData[0]['sample_values'].slice(0, 10))
    var pieData = [{
        values: sampleData[0]['sample_values'].slice(0, 10),
        labels: sampleData[0]['otu_ids'].slice(0, 10),
        hovertext: labels.slice(0, 10),
        hoverinfo: 'hovertext',
        type: 'pie'
    }];
    var pieLayout = {
        margin: { t: 0, l: 0 }
    };
    var PIEE = document.getElementById('pie');
    Plotly.plot(PIEE, pieData, pieLayout);
};
function updateCharts(sampleData, otuData) {
    var sampleValues = sampleData[0]['sample_values'];
    var otuIDs = sampleData[0]['otu_ids'];
    // OTU Description for each otuID
    var labels = otuIDs.map(function(item) {
        return otuData[item]
    });
    // Update Bubble Chart 
    var bubbles = document.getElementById('bubble');
    Plotly.restyle(bubbles, 'x', [otuIDs]);
    Plotly.restyle(bubbles, 'y', [sampleValues]);
    Plotly.restyle(bubbles, 'text', [labels]);
    Plotly.restyle(bubbles, 'marker.size', [sampleValues]);
    Plotly.restyle(bubbles, 'marker.color', [otuIDs]);
    // Update Pie Chart with slice
    var PIEE = document.getElementById('pie');
    var pieUpdate = {
        values: [sampleValues.slice(0, 10)],
        labels: [otuIDs.slice(0, 10)],
        hovertext: [labels.slice(0, 10)],
        hoverinfo: 'hovertext',
        type: 'pie'
    };
    Plotly.restyle(PIEE, pieUpdate);
}
function getData(sample, callback) {
    // Use a request to grab the json data 
    Plotly.d3.json(`/samples/${sample}`, function(error, sampleData) {
        if (error) return console.warn(error);
        Plotly.d3.json('/otu', function(error, otuData) {
            if (error) return console.warn(error);
            callback(sampleData, otuData);
        });
    });
    Plotly.d3.json(`/metadata/${sample}`, function(error, metaData) {
        if (error) return console.warn(error);
        buildMetaData(metaData);
    })
}
function getOptions() {
    // Grab a reference to the dropdown select element
    var selDataset = document.getElementById('selDataset');
    // Use the list of sample names to populate the select options
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
    // Fetch new data each time a new sample is selected
    getData(newSample, updateCharts);
}
function init() {
    getOptions();
}
// Initialize the dashboard
init();
/**