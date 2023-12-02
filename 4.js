const fs = require('fs');
let input = fs.readFileSync('./input/2.txt', "utf-8").replaceAll(';', ',').split(/\r\n|\r|\n/);
let r, g, b;
let tempLine;
let total = 0;
let tempValue = 0;
for(let i = 0; i < input.length; i++) {
    [r, g, b] = [0, 0 ,0];
    tempLine = input[i].substring(input[i].indexOf(': ') + 2).split(', ');
    for(let j = 0; j < tempLine.length; j++) {
        tempValue = parseInt(tempLine[j].substring(0, 2));
        if(tempLine[j].includes('red') && tempValue > r) {
            r = tempValue;
        } else if(tempLine[j].includes('green') && tempValue > g) {
            g = tempValue;
        } else if(tempLine[j].includes('blue') && tempValue > b) {
            b = tempValue;
        }
    }
    total += (r * g * b);
}
console.log(total);