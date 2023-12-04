const fs = require('fs');
const input = fs.readFileSync('./input/1.txt', "utf-8").split(/\r\n|\r|\n/); // overkill regex to split on all newline character variants
let total = 0;
let tempString;
for(let line of input) { // each input line
    tempString = ''; // reset temporary line for use
    for(let i = 0; i < line.length; i++) { // each input line's characters
        if(!isNaN(line[i])) { // pick out numbers
            tempString += line[i];
        }
    }
    if(tempString.length > 0) {
        total += parseInt(tempString[0] + tempString[tempString.length - 1]); // add combination of first and last digits to total
    }
}
console.log(total);