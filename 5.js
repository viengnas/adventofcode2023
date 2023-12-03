const fs = require('fs');
let input = fs.readFileSync('./input/3.txt', "utf-8").split(/\r\n|\r|\n/);
input.unshift('.'.repeat(140));
input.push('.'.repeat(140)); // add padding to start and end to avoid edge case
let numberBuffer = '';
let index;
let total = 0;
for(let i = 1; i < input.length - 1; i++) {
    for(let j = 0; j < input[i].length; j++) {
        if(!isNaN(input[i][j])) {
            numberBuffer += input[i][j];
            if(isNaN(input[i][j + 1])) {
                index = j + 1 - numberBuffer.length;
                for(let k = index - 1; k <= index + numberBuffer.length; k++) {
                    if(checkColumn([input[i - 1][k], input[i][k], input[i + 1][k]])) {
                        total += parseInt(numberBuffer);
                        break;
                    }
                }
                numberBuffer = '';
            }
        }
    }
}
console.log(total);

function checkColumn(column) {
    let isPart = false;
    for(let i = 0; i < column.length; i++) {
        if(typeof column[i] != 'undefined') {
            if(isNaN(column[i]) && column[i] != '.') {
                isPart = true;
                break;
            }
        }
    }
    return isPart;
}