
var xhr = new XMLHttpRequest();
xhr.open("GET", "data.json", true);
xhr.responseType = "text";
xhr.send();

xhr.onload = function() {
    if (xhr.status === 200) {
        var pres = JSON.parse(xhr.responseText);
        console.log(pres);

        for (i = 0; i < pres.presidents.length; i++) {
            console.log("Pres: " + pres.presidents[i].first + " " + pres.presidents[i].last + " " + pres.presidents[i].served);
            console.log("VP: " + pres.vicepresidents[i].first + " " + pres.vicepresidents[i].last);
            console.log("");
        }

        var myString = "";
        for (i = 0; i < pres.presidents.length; i++) {
            var x = i + 1;
            myString += "<br>President " + x + " was: " + pres.presidents[i].first + " " + pres.presidents[i].last;
        }
        document.getElementById("message").innerHTML = myString;
    }
}
