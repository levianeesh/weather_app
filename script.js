const apiKey = "";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`); // giving the url and the api key

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none"; // if error message will show then weather will be hidden
  } else {
    var data = await response.json(); // changing the type of response via json

    // console.log(data); // displaying in console , all the information in main , wind and other parameters

    document.querySelector(".city").innerHTML = data.name; // queryselector is similar to get element by id
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "  %";
    document.querySelector(".wind").innerHTML = data.wind.speed + " Kmps";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "images/mist.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none"; // weather details are shown so , error is hidden
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
}); // when ever someone presses the seach button it will send the input field to searchBox
checkWeather();
