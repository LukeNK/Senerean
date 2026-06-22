const TEMPLATE = {
    id: 'ID of the build, type a dot "." to auto-generate (think it as number plate for builds)',
    owner: 'The name of the current owner',
    desc: 'Breif summary of the build',
    road: "Road base on main entrance, not include house number (you don't have it anyways)",
    fill: '/fill command that will enclose the build, used to concert to the cords of the corners'
    // The fill space will generate nw and se coordinates
}

// list of road type
const ROAD_TYPE = [
    'st',
    'ave',
    'trail'
]

// characters permitted for ID
const ALLOW_CHAR = 'BCDFGHJKLMNPQRSTVWXYZ',
    ALLOW_NUM = '0123456789';