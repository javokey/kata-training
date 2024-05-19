"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countSheeps = void 0;
function countSheeps(arrayOfSheep) {
    return arrayOfSheep.filter(function (x) { return x == true; }).length;
}
exports.countSheeps = countSheeps;


const args = process.argv.slice(2); // Slice to ignore the first two default arguments
if (args.length > 0) {
    try {
        const inputArray = JSON.parse(args[0]);
        if (!Array.isArray(inputArray)) {
            throw new Error("Input is not an array");
        }
        console.log(countSheeps(inputArray));
    } catch (error) {
        console.error("Error parsing input: ", error.message);
    }
} else {
    console.log("Please provide a JSON array of booleans as an argument.");
}