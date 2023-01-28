function taxReport(owner) {
    // simple script to check land status of an owner
    // ~~use to calculate tax~~
    const fixRate = 1, // basic fixed tax rate;
        taxRate = 1.09; // how much Sener/block (sorry flat cus I am lazy)

        
    let area = 0, // total owned area
        builds = []; // list of all builds
    for (let build of REGISTRY) 
        if (build.owner == owner) {
            builds.push(build.id);
            // if there is dimension (to supports legacy database)
            if (build.dimensions)
                area += build.dimensions.x * build.dimensions.z;
        }

    let report = 
`# ${owner}'s land development tax report
# ${new Date().toLocaleDateString()}
Total number of builds: ${builds.length}
Total area covered: ${area}
Total tax due: ${fixRate + area*taxRate} Seners
List of all builds:
${builds.join(', ')}`;

    return report;
}