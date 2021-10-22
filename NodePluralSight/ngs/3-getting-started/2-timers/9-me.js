// const greeting = delay => 
//     setTimeout(() => {
//     console.log('Hello World. ' + delay);
//     greeting(delay + 1);
//   }, delay * 1000);

// greeting(1);

function printHello(delay) {
    var count = 1;
    runInterval = setInterval(() => {
        if (count == 5) {
              clearInterval(runInterval);
              printHello(delay + 100);
        }
        console.log("Hello " + delay);
        count++;
    }, delay)  
}

printHello(100);

console.log('Current User: ', process.env.USER);