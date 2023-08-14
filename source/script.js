function search(place) {
  let apiKey = "cd2t308b1eacdo4ebb841391dc40bf2b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}`).then(updateWeather);
}

function searchLocation(event) {
  event.preventDefault();
  let place = document.querySelector("#locationInput").value;
  search(place);
}

function updateWeather(response) {
  document.querySelector("#current-location").innerHTML = response.data.name;

  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#current-humidity").innerHTML =
    response.data.main.humidity;

  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  document.querySelector("#current-date").innerHTML = formatDate(
    response.data.dt * 1000
  );
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchLocation);

search("Johannesburg");
//current location function

function searchCurrentLocation(position) {
  let apiKey = "cd2t308b1eacdo4ebb841391dc40bf2b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

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
function fahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#current-temp");
  let fahrenheitTemperature = Math.round((9 * 9) / 5 + 32);
  temperature.innerHTML = fahrenheitTemperature;
}

function celsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#current-temp");
  let celsiusTemperature = Math.round(9);
  temperature.innerHTML = celsiusTemperature;
}
