const fs = require('fs');
let input = fs.readFileSync('./input/2.txt', "utf-8").replaceAll(';', ',').split(/\r\n|\r|\n/);
let [r, g, b] = [12, 13, 14];
let tempLine;
let isValid = true;
let total = 0;
let tempValue = 0;
for(let i = 0; i < input.length; i++) {
    isValid = true;
    tempLine = input[i].substring(input[i].indexOf(': ') + 2).split(', ');
    for(let j = 0; j < tempLine.length; j++) {
        tempValue = parseInt(tempLine[j].substring(0, 2));
        if(tempLine[j].includes('red') && tempValue > r) {
            isValid = false;
            break;
        } else if(tempLine[j].includes('green') && tempValue > g) {
            isValid = false;
            break;
        } else if(tempLine[j].includes('blue') && tempValue > b) {
            isValid = false;
            break;
        }
    }
    if(isValid) {
        total += i + 1;
    }
}
console.log(total);