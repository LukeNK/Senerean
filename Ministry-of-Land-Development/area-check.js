// simple script to check the total land area of an owner
// ~~use to calculate tax~~
let sum = 0;
for (let build of REGISTRY) 
    if (build.owner == '' && build.dimensions) 
        sum += build.dimensions.x * build.dimensions.z;
console.log(sum);