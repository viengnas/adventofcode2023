const fs = require('fs');
const input = fs.readFileSync('./input/1.txt', "utf-8").split(/\r\n|\r|\n/);
let newNumbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

let firstElement;
let lastElement;
let firstIndex;
let lastIndex;

let total = 0;
for(let line of input) {
    firstElement = '';
    lastElement = '';
    firstIndex = firstStringIndex(line);
    lastIndex = lastStringIndex(line);

    for(let i = 0; i < line.length; i++) {
        if(!isNaN(line[i])) {
            if(i < firstIndex) {
                firstIndex = i;
                firstElement = line[i];
            }
            
            if(i > lastIndex) {
                lastIndex = i;
                lastElement = line[i];
            }
        }
    }
    total += parseInt("".concat(firstElement, lastElement));
}

console.log(total);

function firstStringIndex(line) {
    let first = 9999999;
    let index;

    for(let i = 0; i < newNumbers.length; i++) {
        index = line.indexOf(newNumbers[i]);
        if(index !== -1 && index < first) {
            first = index;
            firstElement = i + 1;
        }
    }
    return first;
}

function lastStringIndex(line) {
    let last = -1;
    let index;

    for(let i = 0; i < newNumbers.length; i++) {
        index = line.lastIndexOf(newNumbers[i]);
        if(index !== -1 && index > last) {
            last = index;
            lastElement = i + 1;
        }
    }
    return last;
}