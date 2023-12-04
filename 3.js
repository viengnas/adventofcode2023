const fs = require('fs');
let input = fs.readFileSync('./input/2.txt', "utf-8").replaceAll(';', ',').split(/\r\n|\r|\n/); // we don't need to know when each pull ends, since we're only looking for impossible numbers, also overkill regex to split on all newline character variants
let [r, g, b] = [12, 13, 14];
let tempLine;
let isValid = true;
let total = 0;
let tempValue = 0;
for(let i = 0; i < input.length; i++) { // each input line
    isValid = true;
    tempLine = input[i].substring(input[i].indexOf(': ') + 2).split(', '); // game id's are sorted so we don't need to parse them, start line from there and split for each pull
    for(let j = 0; j < tempLine.length; j++) { // each pull
        tempValue = parseInt(tempLine[j].substring(0, 2)); // get number
        if(tempLine[j].includes('red') && tempValue > r) { // check if more than possible red
            isValid = false;
            break;
        } else if(tempLine[j].includes('green') && tempValue > g) { // check if more than possible green
            isValid = false;
            break;
        } else if(tempLine[j].includes('blue') && tempValue > b) { // check if more than possible blue
            isValid = false;
            break;
        }
    }
    if(isValid) { // if all checks passed, game is valid, add the id to the result
        total += i + 1;
    }
}
console.log(total);