const fs = require('fs');
let input = fs.readFileSync('./input/2.txt', "utf-8").replaceAll(';', ',').split(/\r\n|\r|\n/); // we don't need to know when each pull ends, since we're only looking for impossible numbers, also overkill regex to split on all newline character variants
let r, g, b;
let tempLine;
let total = 0;
let tempValue = 0;
for(let i = 0; i < input.length; i++) { // each input line
    [r, g, b] = [0, 0 ,0];
    tempLine = input[i].substring(input[i].indexOf(': ') + 2).split(', '); // game id's are sorted so we don't need to parse them, start line from there and split for each pull
    for(let j = 0; j < tempLine.length; j++) { // each pull
        tempValue = parseInt(tempLine[j].substring(0, 2)); // get number
        if(tempLine[j].includes('red') && tempValue > r) { // check if red is more than the last one, cache accordingly
            r = tempValue;
        } else if(tempLine[j].includes('green') && tempValue > g) { // check if green is more than the last one, cache accordingly
            g = tempValue;
        } else if(tempLine[j].includes('blue') && tempValue > b) { // check if blue is more than the last one, cache accordingly
            b = tempValue;
        }
    }
    total += (r * g * b); // real talk why did it have to be the sum of the power of the sets, my reading comprehension is terrible as is
}
console.log(total);