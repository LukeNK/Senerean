const TEMPLATE = {
    id: 'ID of the build, type a dot "." to auto-generate (think it as number plate for builds)',
    owner: 'The name of the current owner',
    desc: 'Breif summary of the build',
    address: "Road base on main entrance, not include house number (you don't have it anyways)",
    chunks: 'Empty space to signify for the script to save dimension and cord'
}

// list of road type
const ROAD_TYPE = [
    'st',
    'ave',
]

// characters permitted for ID
const ALLOW_CHAR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    ALLOW_NUM = '0123456789';