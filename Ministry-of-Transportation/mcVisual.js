// visualization for minecraft
document.querySelectorAll('[mcVisual]').forEach(elm => {
    let data = elm.innerHTML, res = '';
    // parseData
    data = data.trim().split('\n');
    for (let l1 in data)
        data[l1] = data[l1]
            .replace(/\s+/g, ' ')
            .trim()
            .split(' ');
    // create element
    res = '<table>';
    console.log(data)
    for (const row of data) {
        res += '<tr>'
        for (const cell of row)
            res += `<td class="${cell}">${cell}</td>`;
        res += '</tr>'
    }
    res += '</table>'
    elm.innerHTML = res;
    console.log(res)
})