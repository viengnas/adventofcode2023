const fs = require('fs');
const input = fs.readFileSync('./input/1.txt', "utf-8").split(/\r\n|\r|\n/);

let total = 0;
let tempString;
for(let line of input) {
    tempString = '';
    for(let i = 0; i < line.length; i++) {
        if(!isNaN(line[i])) {
            tempString += line[i];
        }
    }
    if(tempString.length > 0) {
        total += parseInt(tempString[0] + tempString[tempString.length - 1]);
    }
}

console.log(total);