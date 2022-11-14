"use strict";
function bitwiseFunc() {
    let x = 5 ^ 1;
    return x;
}

document.getElementById("bitwise").innerHTML = bitwiseFunc();

const text = "Welcome to the NBA";
var nba = text.search("NBA");
document.getElementById("NBA").innerHTML = nba;

var showText;
showText = (y) => "Original says: " + y;
document.getElementById("NBA2").innerHTML = showText(text);


var newText = text.replace("NBA", "2021 NBA Season");
document.getElementById("newNBA").innerHTML = newText;

function errorPractice() {
    var x = document.getElementById("userInput").value;
    try {
        if(x == "") throw "No Input";
        if(isNaN(x)) throw "That's not a number";
        if(x > 10) throw "That's greater than 10";
        if(x < 1) throw "That's less than 1";
    }
    catch(err) {
        document.getElementById("checkOutput").innerHTML = err;
    }
    finally {
        document.getElementById("finalOutput").innerHTML = "Feel free to input another number";
    }
}

var person = {
    "name": "Terry",
    "age": 33,
    "output": function() { return this.name + " is " + this.age }
};
document.getElementById("person").innerHTML = person.output();


class Person {
    constructor(name, age, occupation) {
        this.name = name;
        this.age = age;
        this.occupation = occupation;
    }
}

let newGuy = new Person("Peter Hong", 36, "Human Resources Manager");
document.getElementById("Peter").innerHTML = "Name: " + newGuy.name 
+ " - Age: " + newGuy.age + " - Occupation: " + newGuy.occupation;


function validateForm() {
    let x = document.forms['myForm']['fname'].value;
    if (x == "") { 
        alert("Name field cannot be left blank.");
        return false;
    }
}