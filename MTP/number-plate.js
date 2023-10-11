let nationCode = 'EI'
    input = 'NC-NICE-CAR';

// convert, position = character numerical value, hypen don't have value
const toNumber = '-1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    checkWeight = [5, 7, 3]

// clear case
input = input.toUpperCase();

// convert to number + add weight
let sum = 0;
for (const l1 in nationCode + input)
    sum += toNumber.indexOf(input[l1]) * checkWeight[l1 % checkWeight.length];

// sum store the mod, -1 and +1 to remove the hypen
sum %= toNumber.length - 1;
sum += 1;

// result
input += toNumber[sum];
console.log(input);