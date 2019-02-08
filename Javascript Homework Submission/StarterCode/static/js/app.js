// from data.js
var tableData = data;

let tbody = d3.select("tbody");
console.log('test');

function table(data) {
  tbody.html("");

  data.forEach((drow) => {
    let row = tbody.append("tr");
    Object.values(drow).forEach((val) => {
      let ufoInfo = row.append("td");
        ufoInfo.text(val);
      }
    );
  });
}

function buttonClick() {

 d3.event.preventDefault();
  let date = d3.select("#datetime").property("value");
  let filteredData = tableData;
  if (date) {
    filteredData = filteredData.filter(row => row.datetime === date);
  }
  table(filteredData);
};

d3.selectAll("#filter-btn").on("click", buttonClick);

table(tableData);

// Get references to the elements of the DOM


// Add event listeners
//$searchBtn.addEventListener("click", handleSearchButtonClick);

// Initialize global variables
var filteredData = tableData;
var count = 0;

// Search
function handleSearchButtonClick() {

    var $tbody = document.querySelector("tbody");
    var $dateTimeInput = document.querySelector("#date_time");
    var $cityInput = document.querySelector("#city");
    var $stateInput = document.querySelector("#state");
    var $countryInput = document.querySelector("#country");
    var $shapeInput = document.querySelector("#shape");
    var $searchBtn = document.querySelector("#search");
    var filterDate = $dateTimeInput.value.trim();
    var filterCity = $cityInput.value.trim().toLowerCase();
    var filterState = $stateInput.value.trim().toLowerCase();
    var filterCountry = $countryInput.value.trim().toLowerCase();
    var filterShape = $shapeInput.value.trim().toLowerCase();

    if (filterDate != "") {
        console.log(filterDate);

        var outputData = filteredData.filter(function (date) {
        return filterDate === date.datetime;
      });
        console.log(outputData);
        table(outputData);
      };

      if (filterCity != "") {
        console.log(filterCity);

        var outputData = filteredData.filter(function (city) {
        return filterCity === city.city;
      });
        console.log(outputData);
        table(outputData);
      };

      if (filterState != "") {
        console.log(filterState);

        var outputData = filteredData.filter(function (state) {
        return filterState === state.state;
      });
        console.log(outputData);
        table(outputData);
      };

      if (filterShape != "") {
        console.log(filterShape);

        var outputData = filteredData.filter(function (shape) {
        return filterShape === shape.shape;
      });
        console.log(outputData);
        table(outputData);
      };
/*
    else if (filterCity != "") {
        filteredData = filteredData.filter(function (city) {
        var dataCity = city.city;



        if (dataCity === filterCity){
          table(filteredData);
          }
        });
    }

    else if (filterState != "") {
        filteredData = filteredData.filter(function (state) {
            var dataState = state.state;
            
          if (dataState === filterState){
            table(filteredData);
          }
        });
    }

    else if (filterCountry != "") {
        filteredData = filteredData.filter(function (country) {
            var dataCountry = country.country;
            
            if (dataCountry === filterCountry){
              table(filteredData);
            }
        });
    }

    else if (filterShape != "") {
        filteredData = filteredData.filter(function (shape) {
            var dataShape = shape.shape;
            
            if (dataShape === filterShape){
              table(filteredData);
            }
        });
    };
*/
}

d3.selectAll("#filter-button").on("click", handleSearchButtonClick);