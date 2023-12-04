const fs = require('fs');
let input = fs.readFileSync('./input/3.txt', "utf-8").split(/\r\n|\r|\n/);
input.unshift('.'.repeat(140));
input.push('.'.repeat(140)); // add padding to start and end to simplify logic in the loop
let numberBuffer = '';
let index;
let counter = 0;
let total = 0;
let potentialGears = [];
for(let i = 1; i < input.length - 1; i++) { // each input line starting from the second row
    for(let j = 0; j < input[i].length; j++) { // each input line's characters
        if(!isNaN(input[i][j])) { // pick out number
            numberBuffer += input[i][j];
            if(isNaN(input[i][j + 1])) { // once the number ends, go back to before the start of it
                index = j + 1 - numberBuffer.length;
                for(let k = index - 1; k <= index + numberBuffer.length; k++) { // begin loop one char before the number, end loop one after the number
                    if(checkColumn([i - 1, i, i + 1], k)) { // check the columns in the numbers' vicinity
                        potentialGears.push({ star: 140 * index + k, number: parseInt(numberBuffer) }); // if at least one character passes, add the location of the star, and the number it touches to cache
                        break;
                    }
                }
                numberBuffer = ''; // reset buffer for use
            }
        }
    }
}
potentialGears.sort((a, b) => a.star - b.star); // sort gears by ascending surrounding star indexes
potentialGears.push({ star: -1, number: -1 }); // edge case cheese
numberBuffer = potentialGears[0].star; // we start the check from id 1, so add the first number to the cache
counter = 1;
for(let i = 1; i < potentialGears.length; i++) { // each number near a star
    if(potentialGears[i].star == numberBuffer) { // if the current one and the one before that matches, count the amount of times they match
        counter++;
    } else if(potentialGears[i].star != numberBuffer) { // once the matches end,
        if(counter == 2) { // if there were exactly two, they're valid gears, add up gear ratios of the matches to the total
            total += (potentialGears[i - 1].number * potentialGears[i - 2].number);
        }
        counter = 1; // reset counter for future matches
        numberBuffer = potentialGears[i].star; // set a new buffer for further checks
    }
}
console.log(total);

function checkColumn(rows, k) {
    let isGear = false;
    for(let i = 0; i < rows.length; i++) { // each character in provided column
        if(typeof input[rows[i]][k] != 'undefined') { // ignore undefined values (happens if logic fetches a nonexistent column around the start/end of the input
            if(input[rows[i]][k] == '*') { // find star characters
                isGear = true; // if one exists, buffered number is potentially a valid gear match
                index = rows[i];
                break;
            }
        }
    }
    return isGear;
}