// convert from MD to Nationstates notation
const fs = require('fs'),
    issue = 0;

let data = fs.readFileSync(issue + '.md', 'utf-8');
data = data.split('\r\n');

// replace line
for (const l1 in data)
    if (data[l1].startsWith('#'))
        data[l1] = '[b]' + data[l1] + '[/b]';

data = data.join('\r\n')
fs.writeFileSync('ns.md', data, 'utf-8');