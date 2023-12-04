const fs = require('fs');
let input = fs.readFileSync('./input/4.txt', "utf-8").split(/\r\n|\r|\n/);
let tempLine;
let counter;
let winningNumbers;
let total = 0;
for(let line of input) {
    winningNumbers = [];
    counter = 0;
    tempLine = line.substring(line.indexOf(' | ') + 3);
    for(let i = 0; i < tempLine.length; i += 3) {
        winningNumbers.push(tempLine[i] + tempLine[i + 1]);
    }
    tempLine = line.substring(line.indexOf(': ') + 2, line.indexOf(' | '));
    for(let j = 0; j < line.indexOf(' | '); j += 3) {
        if(winningNumbers.includes(tempLine[j] + tempLine[j + 1])) {
            if(counter != 0) {
                counter *= 2;
            } else {
                counter++;
            }
        }
    }
    total += counter;
}
console.log(total);