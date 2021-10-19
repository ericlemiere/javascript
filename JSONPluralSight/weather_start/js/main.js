/*jslint browser:true */
'use strict';

var weatherConditions = new XMLHttpRequest();
var weatherForecast = new XMLHttpRequest();
var cObj;
var fObj;

// GET THE CONDITIONS
weatherConditions.open('GET',
 'http://api.openweathermap.org/data/2.5/weather?zip=98632,us&appid=de83d95d04f8b8831f8286ed0fb0f4a8&units=imperial', true);
weatherConditions.responseType = 'text';
weatherConditions.send(null);

weatherConditions.onload = function() {
    if (weatherConditions.status === 200){
        cObj = JSON.parse(weatherConditions.responseText); 
        console.log(cObj);
        var temp = Math.floor(cObj.main.temp);
        document.getElementById("location").innerHTML = cObj.name;
        document.getElementById("weather").innerHTML = cObj.weather[0].description;
        document.getElementById("temperature").innerHTML = temp + "&deg";
        document.getElementById("desc").innerHTML = "Humidity: " + cObj.main.humidity + "%";
        

    } //end if
}; //end function










// GET THE FORECARST
weatherForecast.open('GET',
 'http://api.openweathermap.org/data/2.5/forecast?zip=98632,us&appid=de83d95d04f8b8831f8286ed0fb0f4a8&units=imperial', true);
weatherForecast.responseType = 'text'; 
weatherForecast.send();

weatherForecast.onload = function() {
if (weatherForecast.status === 200){
	fObj = JSON.parse(weatherForecast.responseText);
	console.log(fObj);

    var dayIndex = 0;
    var dateRaw = fObj.list[dayIndex].dt_txt;
    var today = new Date(dateRaw);
    document.getElementById("r1c1").innerHTML = today.toDateString().substring(0,10);
    var icon_path = "http://openweathermap.org/img/w/" + fObj.list[dayIndex].weather[dayIndex].icon + ".png";
    document.getElementById("r1c2").src = icon_path;
    document.getElementById("r1c3").innerHTML = Math.floor(fObj.list[dayIndex].main.temp_min) + "&deg";
    document.getElementById("r1c4").innerHTML = Math.floor(fObj.list[dayIndex].main.temp_max) + "&deg";

    var dayIndex = 8;
    var dateRaw = fObj.list[dayIndex].dt_txt;
    var today = new Date(dateRaw);
    document.getElementById("r2c1").innerHTML = today.toDateString().substring(0,10);
    var icon_path = "http://openweathermap.org/img/w/" + fObj.list[dayIndex].weather[0].icon + ".png";
    document.getElementById("r2c2").src = icon_path;
    document.getElementById("r2c3").innerHTML = Math.floor(fObj.list[dayIndex].main.temp_min) + "&deg";
    document.getElementById("r2c4").innerHTML = Math.floor(fObj.list[dayIndex].main.temp_max) + "&deg";

    var dayIndex = 16;
    var dateRaw = fObj.list[dayIndex].dt_txt;
    var today = new Date(dateRaw);
    document.getElementById("r3c1").innerHTML = today.toDateString().substring(0,10);
    var icon_path = "http://openweathermap.org/img/w/" + fObj.list[dayIndex].weather[0].icon + ".png";
    document.getElementById("r3c2").src = icon_path;
    document.getElementById("r3c3").innerHTML = Math.floor(fObj.list[dayIndex].main.temp_min) + "&deg";
    document.getElementById("r3c4").innerHTML = Math.floor(fObj.list[dayIndex].main.temp_max) + "&deg";

	
} //end if
}; //end function


