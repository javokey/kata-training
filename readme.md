## Paste this into the compiled js file to be able to read args from terminal input

> Read command line arguments
~~~
const args = process.argv.slice(2); // Slice to ignore the first two default arguments
if (args.length > 0) {
    const inputString = args[0];
    console.log(solution(inputString));
} else {
    console.log("Please provide a string as an argument.");
}
~~~