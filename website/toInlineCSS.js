// Source - https://stackoverflow.com/a/62458284
// Posted by Rothrock
// Retrieved 2026-07-14, License - CC BY-SA 4.0
// Modified to remove external stylesheets

function applyInline(element, recursive = true) {
    const matches = matchRules(element);

    // we need to preserve any pre-existing inline styles.
    var srcRules = document.createElement(element.tagName).style;
    srcRules.cssText = element.style.cssText;

    console.log(matches);
    matches.forEach(rule => {
        for (var prop of rule.style) {
            console.log(`Applying ${prop} to ${element.tagName}`);
            let val = srcRules.getPropertyValue(prop) || rule.style.getPropertyValue(prop);
            let priority = rule.style.getPropertyPriority(prop);

            element.style.setProperty(prop,val,priority);
        }
    });

    console.log(element)
    if (recursive) {
        [...element.children].forEach(child => {
            applyInline(child, recursive);
        });
    }
}

function matchRules(el, sheets) {
    sheets = sheets || document.styleSheets;
    var ret = [];

    for (var i in sheets) {
        if (
            sheets[i]?.ownerNode?.nodeName !== "STYLE"
            || !sheets.hasOwnProperty(i)
        ) continue;
        var rules = sheets[i].cssRules;
        for (var r in rules) {
            console.log(`Checking ${rules[r].selectorText} against ${el.tagName}`);
            if (rules[r].selectorText && el.matches(rules[r].selectorText)) {
                ret.push(rules[r]);
            }
        }
    }
    return ret;
}
