// write a function that takes a string and 
// number called n, and repeats the string
// n times with a space in the middle of each time.

// Example: "Jordan", 3 => "Jordan Jordan Jordan"

function repeatNTimesWithSpace(string, n){
    if (!string) return '';

    const arr = new Array(n).fill(string);

    return arr.join(' ');
};

// Example: library => Library
function capitalizeFirstLetter(string){

    if (!string) return '';

    return string[0].toUpperCase() + string.slice(1);
};

module.exports = {repeatNTimesWithSpace, capitalizeFirstLetter};