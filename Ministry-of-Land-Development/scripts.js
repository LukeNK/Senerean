function taxReport(owner) {
    // simple script to check land status of an owner
    // ~~use to calculate tax~~
    const fixRate = 1, // basic fixed tax rate;
        taxRate = 1.09; // how much Sener/block (sorry flat cus I am lazy)
        
    let area = 0, // total owned area
        builds = [], // list of all builds
        totalBuilds = 0; // total number of builds
    for (let build of REGISTRY) 
        if (build.owner == owner) {
            // if there is dimension (to supports legacy database)
            if (build.dimensions) {
                builds.push(build.id);
                area += build.dimensions.x * build.dimensions.z;
            }
            totalBuilds++
        }

    let report = 
`# ${owner}'s land development tax report
# ${new Date().toLocaleDateString()}
Total number of builds: ${builds.length}
Total area covered: ${area} blocks^2
Total tax due: ${(fixRate + area*taxRate).toFixed(2)} Seners
List of all builds that are taxable (${builds.length}/${totalBuilds}):
${builds.join(', ')};`

    return report;
}

function idSearch(query) {
    // search for ID, return all matching builds
    let builds = [];
    for (const build of REGISTRY)
        if (build.id.includes(query)) builds.push(build);
    return builds;
}