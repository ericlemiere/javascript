/*jslint browser:true */
"use strict";

const getWeather = (zip) => {
  let weatherConditions = new XMLHttpRequest();
  let weatherForecast = new XMLHttpRequest();
  let cObj;
  let fObj;
  let zipCode = zip;

  // GET THE CONDITIONS
  let weatherConditionsURL = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=de83d95d04f8b8831f8286ed0fb0f4a8&units=imperial`;
  weatherConditions.open("GET", weatherConditionsURL, true);
  weatherConditions.responseType = "text";
  weatherConditions.send(null);

  weatherConditions.onload = function () {
    if (weatherConditions.status === 200) {
      cObj = JSON.parse(weatherConditions.responseText);
      console.log(cObj);
      var temp = Math.floor(cObj.main.temp);
      document.getElementById("location").innerHTML = cObj.name;
      document.getElementById("weather").innerHTML =
        cObj.weather[0].description;
      document.getElementById("temperature").innerHTML = temp + "&deg";
      document.getElementById("desc").innerHTML =
        "Humidity: " + cObj.main.humidity + "%";
    } //end if
    else alert("Zip code entered not found.");
  }; //end function

  // GET THE FORECARST
  let weatherForecastURL = `http://api.openweathermap.org/data/2.5/forecast?zip=${zipCode},us&appid=de83d95d04f8b8831f8286ed0fb0f4a8&units=imperial`;
  weatherForecast.open("GET", weatherForecastURL, true);
  weatherForecast.responseType = "text";
  weatherForecast.send();

  weatherForecast.onload = function () {
    if (weatherForecast.status === 200) {
      fObj = JSON.parse(weatherForecast.responseText);
      console.log(fObj);

      let numOfDays = 5;
      let dayIndex = 0;

      for (let i = 1; i <= numOfDays; i++) {
        let dateRaw = fObj.list[dayIndex].dt_txt;
        let today = new Date(dateRaw);

        document.getElementById(`r${i}c1`).innerHTML = today
          .toDateString()
          .substring(0, 3);
        document.getElementById(`r${i}c5`).innerHTML = today
          .toDateString()
          .substring(4, 10);
        let icon_path =
          "http://openweathermap.org/img/w/" +
          fObj.list[dayIndex].weather[0].icon +
          ".png";
        document.getElementById(`r${i}c2`).src = icon_path;
        let lowTemp = Math.floor(fObj.list[dayIndex].main.temp_min);
        let dayIndex8 = dayIndex + 8;
        document.getElementById(`r${i}c4`).innerHTML =
          Math.floor(fObj.list[dayIndex].main.temp_max) + "&deg";
        while (dayIndex < dayIndex8 && dayIndex <= fObj.list.length) {
          if (Math.floor(fObj.list[dayIndex].main.temp_min) < lowTemp) {
            lowTemp = Math.floor(fObj.list[dayIndex].main.temp_min);
          }
          dayIndex += 1;
        }
        document.getElementById(`r${i}c3`).innerHTML = lowTemp + "&deg";
      }
    } //end if
  }; //end function
};

const getZip = () => {
  let zipInput = document.getElementById("zipInput").value;
  for (let i = 0; i < 5; i++) {
    if (isNaN(zipInput[i])) {
      alert("Please enter a valid 5-digit zip code.");
      return;
    }
  }

  getWeather(zipInput);
};
