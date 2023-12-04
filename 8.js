const fs = require('fs');
let input = fs.readFileSync('./input/4.txt', "utf-8").split(/\r\n|\r|\n/);
let inputMap = {};
for(let key in input) {
    inputMap[key] = 1;
}
let tempLine;
let counter;
let winningNumbers;
let extraInput;
let total = 0;
for(let i = 0; i < input.length; i++) {
    extraInput = [];
    counter = i;
    winningNumbers = [];
    tempLine = input[i].substring(input[i].indexOf(' | ') + 3);
    for(let j = 0; j < tempLine.length; j += 3) {
        winningNumbers.push(tempLine[j] + tempLine[j + 1]);
    }
    tempLine = input[i].substring(input[i].indexOf(': ') + 2, input[i].indexOf(' | '));
    for(let k = 0; k < input[i].indexOf(' | '); k += 3) {
        if(winningNumbers.includes(tempLine[k] + tempLine[k + 1])) {
            counter++;
            extraInput.push(counter);
        }
    }
    for(let l = 0; l < inputMap[i]; l++) {
        for(let game of extraInput) {
            inputMap[game]++;
        }
    }
}
for(let key in inputMap) {
    total += inputMap[key];
}
console.log(total);