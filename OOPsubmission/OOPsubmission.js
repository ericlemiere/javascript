class Dog {
    constructor (breed, color, height, weight) {
        this.breed = breed;
        this.color = color;
        this.height = height;
        this.weight = weight;
    }

    shake() {
        return ", shake... good dog.";
    }
    sit() {
        return ", sit... good dog.";
    }
    layDown() {
        return ", lay down... good dog.";
    }
}

let hudson = new Dog("Hound", "Brown", "2 feet", "60 lbs");

// document.getElementById("dog").innerHTML

console.log("Hudson is a " + hudson.color + " " + hudson.breed + 
" who can do many tricks.");
console.log("Hudson" + hudson.layDown());