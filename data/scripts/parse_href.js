searchParams = new URLSearchParams(window.location.search);
let text = searchParams.get('highlight');

function bold(elt, str) {
    let bolden = RegExp('(\\W|^)(' + `${str}` + ')(\\W|$)', 'ig');
    if (!elt.childElementCount) {
        elt.innerHTML = elt.innerHTML.replace(bolden, `$1<span id="highlight" class="highlight">$2</span>$3`);
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
