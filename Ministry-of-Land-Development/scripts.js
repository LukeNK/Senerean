function taxReport(owner) {
    // simple script to check land status of an owner
    let area = 0, // total owned area
        builds = [], // list of all taxable builds
        totalBuilds = 0, // total number of builds
        totalTax = 0;
    for (let build of REGISTRY) 
        if (build.owner == owner) {
            // if there is dimension (to supports legacy database)
            if (build.dimensions) {
                builds.push(build.id + ' = ');
                let buildDim = build.dimensions.x * build.dimensions.z;
                area += buildDim;
                totalTax += devTax(buildDim);
                builds[builds.length - 1] = 
                    builds.at(-1) + devTax(buildDim).toFixed(2)
            }
            totalBuilds++
        }

    let report = 
`# ${owner}'s land development tax report
# ${new Date().toLocaleDateString()}
Total number of taxable builds: ${builds.length}
Total area covered: ${area} blocks^2
List of all builds that are taxable (${builds.length}/${totalBuilds}):
${builds.join('\n')}
Total  = ${totalTax.toLocaleString('en-CA', 
    {
        minimumFractionDigits: 2, 
        maximumFractionDigits:2
    })
} Seners`

    return report;
}

function buildSearch(query) {
    // search for build, return all matching builds
    let builds = [];
    if (query.includes(',')) {
        // if there is a comma, that mean user is searching for cord
        query = query.split(',');
        const x = query[0], z = query[1];
        for (const build of REGISTRY) {
            let nw = build.nw || 0, 
                se = build.se || 0;
            if (!nw || !se) continue; // sorry legacy builds
            if (
                nw.x < x && x < se.x
                && nw.z < z && z < se.z
            ) builds.push(build);
        }
    } else // normal phrase search
        for (const build of REGISTRY)
            if (
                build.id.includes(query.toUpperCase())
                || build.desc.toUpperCase().includes(query.toUpperCase())
                || build.owner.toUpperCase() == query.toUpperCase()
            ) builds.push(build);
    return builds;
}

function devTax(area) {
    // function to calculate tax PER BUILD
    // please use desmos before changing values here
    const fixedRate = 100, // fixed rate for every builds 
        maxTax = 0.65, // highest tax percent over value
        maxBracket = 200, // block^2 where it is maxTax
        taxExp = 4, // tax exponent that being raised to
        valPerBlock = 15; // seners per block
    // function define
    const min = Math.min, pow = Math.pow;

    let bracket = min(area / maxBracket, 1); // calculate current bracket
    let taxPercent = maxTax * pow(bracket, taxExp) // get percent of bracket
    return fixedRate + area * valPerBlock * taxPercent;
}
