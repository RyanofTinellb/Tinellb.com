searchParams = new URLSearchParams(window.location.search);
let text = searchParams.get('highlight');
let firsttime = true

function highlight(match, p1, p2, p3) {
    id = firsttime ? ' id="highlight"' : '';
    firsttime = false;
    return `${p1}<span${id} class="highlight">${p2}</span>${p3}`
}

function bold(elt, str) {
    let bolden = RegExp('(\\W|^)(' + `${str}` + ')(\\W|$)', 'ig');
    if (!elt.childElementCount) {
        elt.innerHTML = elt.innerHTML.replace(bolden, highlight);
        return;
    } 
    Array.from(elt.children).forEach(child => bold(child, str));
}

if (text) {
    let h1 = document.getElementsByTagName('h1')[0];
    h1.innerHTML += ' <a href="#highlight">→</a>'
    let main = document.getElementsByTagName('main')[0];
    bold(main, text);
}

let term = searchParams.get('term')
if (term) {
    window.location.href = `/special/search.html?term=${term}`;
}
