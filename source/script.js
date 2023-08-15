function search(place) {
  let apiKey = "cd2t308b1eacdo4ebb841391dc40bf2b";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${place}&key=${apiKey}&units=metric`;

  axios.get(`${apiUrl}`).then(updateWeather);
}

function searchLocation(event) {
  event.preventDefault();
  let place = document.querySelector("#locationInput").value;
  search(place);
}

function updateWeather(response) {
  document.querySelector("#current-location").innerHTML = response.data.city;
  celsiusTemperature = response.data.temperature.current;
  document.querySelector("#current-temp").innerHTML =
    Math.round(celsiusTemperature);

  document.querySelector("#current-humidity").innerHTML =
    response.data.temperature.humidity;

  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.condition.description;

  document.querySelector("#current-date").innerHTML = formatDate(
    response.data.dt * 1000
  );

  document
    .querySelector("#first-icon")
    .setAttribute(
      "src",
      `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
    );

  getForecast(response.data.coordinates);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchLocation);

//current location function

function searchCurrentLocation(position) {
  let apiKey = "cd2t308b1eacdo4ebb841391dc40bf2b";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${position.coords.langitude}&lat=${position.coords.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function showCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

let currentLocation = document.querySelector("#current");
currentLocation.addEventListener("click", showCurrentLocation);

//Date function
function formatDate(timespan) {
  let now = new Date();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = now.getDay();
  let hours = now.getHours();
  let minutes = now.getMinutes();

  function twoDigits(value) {
    return value < 10 ? `0${value}` : value;
  }

  return `${days[day]}, ${twoDigits(hours)}:${twoDigits(minutes)}`;
}

function formatDay(timespan) {
  let date = new Date(timespan * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

//change units function
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#current-temp");
  let fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  temperatureElement.innerHTML = fahrenheitTemperature;
}

let celsiusTemperature = null;
let fahrenheitLink = document.querySelector("#fahrenheitSymbol");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperature = document.querySelector("#current-temp");
  temperature.innerHTML = Math.round(celsiusTemperature);
}

let celsiusLink = document.querySelector("#celsiusSymbol");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

//Function for the upcoming days

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  console.log(response.data.daily);
  let forecastHTML = ` <div class="row hours">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `    <div class="col-2">
      <div class="p-2 border bg-light">
      ${formatDay(
        forecastDay.time
      )}<br/> <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
          forecastDay.condition.icon
        }.png" alt="weather-icon" width= 40>
     <br/> <span class = "maximum-temp">${Math.round(
       forecastDay.temperature.maximum
     )}°</span> <span class = "minimum-temp">${Math.round(
          forecastDay.temperature.minimum
        )}°</span>
    </div> 
    </div>`;
    }
  });
  forecastHTML = forecastHTML + ` </div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "cd2t308b1eacdo4ebb841391dc40bf2b";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

search("Johannesburg");
