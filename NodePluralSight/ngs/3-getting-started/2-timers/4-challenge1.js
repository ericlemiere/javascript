var counter = 1;
const theOneFunc = () => {
    console.log("Hello");
    counter++;
    if (counter == 2) { setTimeout(theOneFunc, 4 * 1000); }
};

setTimeout(theOneFunc, 4 * 1000);

// Hello after 4 seconds

// Hello after 8 seconds

// You can define only ONE function
