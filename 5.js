const fs = require('fs');
let input = fs.readFileSync('./input/3.txt', "utf-8").split(/\r\n|\r|\n/); // overkill regex to split on all newline character variants
input.unshift('.'.repeat(140));
input.push('.'.repeat(140)); // add padding to start and end to simplify logic in the loop
let numberBuffer = '';
let index;
let total = 0;
for(let i = 1; i < input.length - 1; i++) { // each input line starting from the second row
    for(let j = 0; j < input[i].length; j++) { // each input line's characters
        if(!isNaN(input[i][j])) { // pick out number
            numberBuffer += input[i][j];
            if(isNaN(input[i][j + 1])) { // once the number ends, go back to before the start of it
                index = j + 1 - numberBuffer.length;
                for(let k = index - 1; k <= index + numberBuffer.length; k++) { // begin loop one char before the number, end loop one after the number
                    if(checkColumn([input[i - 1][k], input[i][k], input[i + 1][k]])) { // check the columns in the numbers' vicinity
                        total += parseInt(numberBuffer); // if at least one character passes, add id towards the sum
                        break;
                    }
                }
                numberBuffer = ''; // reset buffer for use
            }
        }
    }
}
console.log(total);

function checkColumn(column) {
    let isPart = false;
    for(let i = 0; i < column.length; i++) { // each character in provided column
        if(typeof column[i] != 'undefined') { // ignore undefined values (happens if logic fetches a nonexistent column around the start/end of the input
            if(isNaN(column[i]) && column[i] != '.') { // find non-filler characters
                isPart = true; // if one exists, buffered number is a valid part id
                break;
            }
        }
    }
    return isPart;
}