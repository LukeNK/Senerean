let COMP_LOAD = document.querySelectorAll("[html-src]").length; // total number of component need to load

(() => {
    // Load all HTML using fetch
    document.querySelectorAll("[html-src]").forEach((elm) => {
        fetch(elm.getAttribute('html-src')).then(res => res.text())
        .then((res) => {
            elm.innerHTML += res;
            compLoaded();
        });
    });
})();

// wait until all components loaded
function compLoaded() {
    COMP_LOAD -= 1;
    if (COMP_LOAD != 0) return; // if not done loading

    // all components loaded
    // Get current page division name
    let curPage = document.location.pathname.split('/').at(-2).replace(new RegExp('-', 'g'), ' ')
    document.getElementById('curPage').innerHTML = curPage;
}