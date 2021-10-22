// Print "Hello World"
// Every second
// And stop after 5 times

// After 5 times. Print "Done" and let Node exit.

var count = 1;
const hello = setInterval(() => {
    console.log("Hello " + count)
    count++;

    if (count == 6) {
        clearInterval(hello);
    }
}, 1000);


