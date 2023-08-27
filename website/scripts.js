let COMP_LOAD = document.querySelectorAll("[html-src]").length; // total number of component need to load

// env variables
let DARK_THEME = false;

(() => {
    // Load all HTML using fetch
    document.querySelectorAll("[html-src]").forEach(elm => {
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

    // page title if there is no title
    if (!document.getElementsByTagName('title').length) {
        document.getElementsByTagName('head')[0].innerHTML += 
            `<title>${curPage}</title>`
    }
    
    // get theme cookie
    if (getCookie('darkTheme') == 1) theme(); // switch to dark theme
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
  
function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ')
            c = c.substring(1);
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function theme() {
    // toogle theme
    if (DARK_THEME) {
        // from dark theme turn back to white theme
        document.body.classList.remove('darkTheme');
        document.getElementById('headerLogo').setAttribute('src', '../website/logo.png')
    } else {
        document.body.classList.add('darkTheme');
        document.getElementById('headerLogo').setAttribute('src', '../website/logo_white.png')
    }
    DARK_THEME = !DARK_THEME;
    setCookie('darkTheme', DARK_THEME? 1 : 0)
}