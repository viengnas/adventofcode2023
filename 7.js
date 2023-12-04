const fs = require('fs');
let input = fs.readFileSync('./input/4.txt', "utf-8").split(/\r\n|\r|\n/); // overkill regex to split on all newline character variants
let tempLine;
let counter;
let winningNumbers;
let total = 0;
for(let line of input) { // each input line
    winningNumbers = [];
    counter = 0;
    tempLine = line.substring(line.indexOf(' | ') + 3); // card id's are sorted so we don't need to parse them, start line from where winning numbers begin
    for(let i = 0; i < tempLine.length; i += 3) { // numbers are evenly spaced, we can get all of them by checking every 3 characters
        winningNumbers.push(tempLine[i] + tempLine[i + 1]);
    }
    tempLine = line.substring(line.indexOf(': ') + 2, line.indexOf(' | ')); // sanitize line to start from after card id, and end after own numbers do
    for(let j = 0; j < line.indexOf(' | '); j += 3) { // numbers are evenly spaced, we can get all of them by checking every 3 characters
        if(winningNumbers.includes(tempLine[j] + tempLine[j + 1])) { // if owned number is part of winning number cache, calculate points it is worth
            if(counter != 0) { // if it's not the first match, double the points
                counter *= 2;
            } else { // otherwise give one point
                counter++;
            }
        }
    }
    total += counter; // add obtained points to total
}
console.log(total);