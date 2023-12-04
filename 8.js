const fs = require('fs');
let input = fs.readFileSync('./input/4.txt', "utf-8").split(/\r\n|\r|\n/); // overkill regex to split on all newline character variants
let inputMap = {};
for(let key in input) { // fill a map with counters for every line
    inputMap[key] = 1;
}
let tempLine;
let counter;
let winningNumbers;
let extraInput;
let total = 0;
for(let i = 0; i < input.length; i++) { // each input line
    extraInput = []; // reset buffers for use
	winningNumbers = [];
    counter = i;
    tempLine = input[i].substring(input[i].indexOf(' | ') + 3); // card id's are sorted so we don't need to parse them, start line from where winning numbers begin
    for(let j = 0; j < tempLine.length; j += 3) { // numbers are evenly spaced, we can get all of them by checking every 3 characters
        winningNumbers.push(tempLine[j] + tempLine[j + 1]);
    }
    tempLine = input[i].substring(input[i].indexOf(': ') + 2, input[i].indexOf(' | ')); // sanitize line to start from after card id, and end after own numbers do
    for(let k = 0; k < input[i].indexOf(' | '); k += 3) { // numbers are evenly spaced, we can get all of them by checking every 3 characters
        if(winningNumbers.includes(tempLine[k] + tempLine[k + 1])) { // if owned number is part of winning number cache, iteratively copy next card
            counter++;
            extraInput.push(counter); // add to buffer of copied cards
        }
    }
    for(let l = 0; l < inputMap[i]; l++) { // loop by amount in counter of the current card
        for(let game of extraInput) { // add to buffered card counters by the amount of times your current card got copied
            inputMap[game]++;
        }
    }
}
for(let key in inputMap) { // sum up all the counters to get the total amount of cards
    total += inputMap[key];
}
console.log(total);