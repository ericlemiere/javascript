
var start = '{ "Eric": {"spouse": "Amber", "dog": "Harvard" }, "favSeason": "Fall" }';

var myObject = JSON.parse(start);
console.log(myObject);
var myString = JSON.stringify(myObject);
console.log(myString);

document.getElementById("message").innerHTML = myObject.Eric.dog;


var xhr = new XMLHttpRequest();
xhr.open("GET", "data.json", true);
xhr.responseType = "text";

// xhr.onreadystatechange = function() {
//     console.log(xhr.readyState);
//     console.log(xhr.status + " " + xhr.statusText);
// }

xhr.onload = function() {
    if (xhr.status === 200) {
        var myStuff = JSON.parse(xhr.responseText);
        console.log(myStuff);
    }
}

xhr.send();