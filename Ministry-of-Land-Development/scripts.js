function taxReport(owner) {
    // simple script to check land status of an owner
    let area = 0, // total owned area
        builds = [], // list of all builds
        totalBuilds = 0, // total number of builds
        totalTax = 0;
    for (let build of REGISTRY) 
        if (build.owner == owner) {
            // if there is dimension (to supports legacy database)
            if (build.dimensions) {
                builds.push(build.id);
                let buildDim = build.dimensions.x * build.dimensions.z;
                area += buildDim;
                totalTax += landTax(buildDim)
            }
            totalBuilds++
        }

    let report = 
`# ${owner}'s land development tax report
# ${new Date().toLocaleDateString()}
Total number of taxable builds: ${builds.length}
Total area covered: ${area} blocks^2
Total tax due: ${(totalTax.toFixed(2))} Seners
List of all builds that are taxable (${builds.length}/${totalBuilds}):
${builds.join(', ')}`

    return report;
}

function idSearch(query) {
    // search for ID, return all matching builds
    let builds = [];
    for (const build of REGISTRY)
        if (build.id.includes(query)) builds.push(build);
    return builds;
}

function landTax(area) {
    // function to calculate tax PER BUILD
    // please use desmos before changing values here
    const maxTax = 0.65, // highest tax percent over value
        maxBracket = 200, // block^2 where it is maxTax
        taxExp = 4, // tax exponent that being raised to
        valPerBlock = 15; // seners per block
    // function define
    const min = Math.min, pow = Math.pow;

    let bracket = min(area / maxBracket, 1); // calculate current bracket
    let taxPercent = maxTax * pow(bracket, taxExp) // get percent of bracket
    return (area * valPerBlock * taxPercent);
}
