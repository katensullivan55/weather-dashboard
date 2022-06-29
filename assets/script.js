// constants incl. API link
const userCityEl = document.getElementById("user-city");
const searchEl = document.getElementById("search-btn");
const cityNameEl = document.getElementById("cityname");
const tempEl = document.getElementById("temperature");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind-speed");
const UVEl = document.getElementById("UV-index");
var fiveDayEl = document.getElementById("five-Day");
var currentWeatherEl = document.getElementById("current-weather");

const APIKey = "7771575fcc726257a931929957842bbf";


// function that get weather data from API
function getWeather(cityname) {

    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&appid=" + APIKey;
    axios.get(queryURL)
        .then(function (response) {

            currentWeatherEl.classList.remove("d-none");

            const date = new date(response.data.dt * 1000);
            const day = currentDate.getDate();
            const month = currentDate.getMonth() + 1;
            const year = currentDate.getFullYear();
            cityNameEl.innerHTML = response.data.name + " (" + month + "/" + day + "/" + year + ") ";

            tempEl.innerHTML = "Temperature: " + k2f(response.data.main.temp) + " &#176F";
            humidityEl.innerHTML = "Humidity: " + response.data.main.humidity + "%";
            windEl.innerHTML = "Wind Speed: " + response.data.wind.speed + " MPH";

            let lat = response.data.coord.lat;
            let lon = response.data.coord.lon;
            let UVQueryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&cnt=1";
            axios.get(UVQueryURL)
                .then(function (response) {
                    let UVIndex = document.createElement("span");


                    if (response.data[0].value < 4) {
                        UVIndex.setAttribute("class", "badge badge-success");
                    }
                    else if (response.data[0].value < 8) {
                        UVIndex.setAttribute("class", "badge badge-warning");
                    }
                    else {
                        UVIndex.setAttribute("class", "badge badge-danger");
                    }
                    console.log(response.data[0].value)
                    UVIndex.innerHTML = response.data[0].value;
                    UVEl.innerHTML = "UV Index: ";
                    UVEl.append(UVIndex);
                });


            let cityID = response.data.id;
            let fcQueryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + APIKey;
            axios.get(fcQueryURL)
                .then(function (response) {
                    fiveDayEl.classList.remove("d-none");


                    const fcs = document.querySelectorAll(".forecast");
                    for (i = 0; i < fcEls.length; i++) {
                        fcs[i].innerHTML = "";
                        const fcIndex = i * 8 + 4;
                        const fcDate = new Date(response.data.list[fcIndex].dt * 1000);
                        const fcDay = fcDate.getDate();
                        const fcMonth = fcDate.getMonth() + 1;
                        const fcYear = fcDate.getFullYear();
                        const fcDateEl = document.createElement("p");
                        fcDateEl.setAttribute("class", "mt-3 mb-0 fc-date");
                        fcDateEl.innerHTML = fcMonth + "/" + fcDay + "/" + fcYear;
                        fcs[i].append(fcDateEl);
                        const fcWeatherEl = document.createElement("img");
                        fcs[i].append(fcWeatherEl);
                        const fcTemp = document.createElement("p");
                        fcTemp.innerHTML = "Temp: " + k2f(response.data.list[fcIndex].main.temp) + " F";
                        fcs[i].append(fcTemp);
                        const fcHumidity = document.createElement("p");
                        fcHumidity.innerHTML = "Humidity: " + response.data.list[fcIndex].main.humidity + "%";
                        fcs[i].append(fcHumidity);
                    }
                })
        });
}

// localStorage input if any

// function that runs all info