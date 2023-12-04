const fs = require('fs');
const input = fs.readFileSync('./input/1.txt', "utf-8").split(/\r\n|\r|\n/); // overkill regex to split on all newline character variants
let newNumbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']; // all possible words of numbers
let firstElement;
let lastElement;
let firstIndex;
let lastIndex;
let total = 0;
for(let line of input) { // each input line
    firstElement = '';
    lastElement = '';
    firstIndex = firstStringIndex(line); // get locations of newNumbers first
    lastIndex = lastStringIndex(line);
    for(let i = 0; i < line.length; i++) { // each input line's characters
        if(!isNaN(line[i])) { // pick out numbers
            if(i < firstIndex) { // compare each match to newNumbers location and adjust cache accordingly
                firstIndex = i;
                firstElement = line[i];
            }
            if(i > lastIndex) { // compare each match to newNumbers location and cache accordingly
                lastIndex = i;
                lastElement = line[i];
            }
        }
    }
    total += parseInt("".concat(firstElement, lastElement)); // force into string before parsing to prevent unexpected results
}
console.log(total);

function firstStringIndex(line) {
    let first = 9999999;
    let index;

    for(let i = 0; i < newNumbers.length; i++) { // check goes through each possibility every time to prevent edge cases such as "oneight"
        index = line.indexOf(newNumbers[i]);
        if(index !== -1 && index < first) { // check if the word of number exists and is placed earlier than the last and cache accordingly
            first = index;
            firstElement = i + 1;
        }
    }
    return first;
}
function lastStringIndex(line) {
    let last = -1;
    let index;

    for(let i = 0; i < newNumbers.length; i++) { // check goes through each possibility every time to prevent edge cases such as "oneight"
        index = line.lastIndexOf(newNumbers[i]);
        if(index !== -1 && index > last) { // check if the word of number exists and is placed earlier than the last and cache accordingly
            last = index;
            lastElement = i + 1;
        }
    }
    return last;
}