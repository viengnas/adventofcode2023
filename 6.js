const fs = require('fs');
let input = fs.readFileSync('./input/3.txt', "utf-8").split(/\r\n|\r|\n/);
input.unshift('.'.repeat(140));
input.push('.'.repeat(140)); // add padding to start and end to avoid edge case
let numberBuffer = '';
let index;
let counter = 0;
let total = 0;
let potentialGears = [];
for(let i = 1; i < input.length - 1; i++) {
    for(let j = 0; j < input[i].length; j++) {
        if(!isNaN(input[i][j])) {
            numberBuffer += input[i][j];
            if(isNaN(input[i][j + 1])) {
                index = j + 1 - numberBuffer.length;
                for(let k = index - 1; k <= index + numberBuffer.length; k++) {
                    if(checkColumn([i - 1, i, i + 1], k)) {
                        potentialGears.push({ star: 140 * index + k, number: parseInt(numberBuffer) });
                        break;
                    }
                }
                numberBuffer = '';
            }
        }
    }
}
potentialGears.sort((a, b) => a.star - b.star);
potentialGears.push({ star: -1, number: -1 }); // edge case cheese
numberBuffer = potentialGears[0].star;
counter = 1;
for(let i = 1; i < potentialGears.length; i++) {
    if(potentialGears[i].star == numberBuffer) {
        counter++;
    } else if(potentialGears[i].star != numberBuffer) {
        if(counter == 2) {
            total += (potentialGears[i - 1].number * potentialGears[i - 2].number);
        }
        counter = 1;
        numberBuffer = potentialGears[i].star;
    }
}
console.log(total);

function checkColumn(rows, k) {
    let isGear = false;
    for(let i = 0; i < rows.length; i++) {
        if(typeof input[rows[i]][k] != 'undefined') {
            if(input[rows[i]][k] == '*') {
                isGear = true;
                index = rows[i];
                break;
            }
        }
    }
    return isGear;
}