searchParams = new URLSearchParams(window.location.search);
let firsttime = true
let bolden;

function circle(_match, p1, p2, p3) {
    id = firsttime ? ' id="highlight"' : '';
    firsttime = false;
    return `${p1}<span${id} class="highlight">${p2}</span>${p3}`
}

function bold(elt, details_flag) {
    if (!elt.childElementCount) {
        if (details_flag && elt.tagName != 'SUMMARY') return;
        if (elt.tagName == 'DETAILS') details_flag = true;
        elt.innerHTML = elt.innerHTML.replace(bolden, circle);
        return;
    }
    Array.from(elt.children).forEach(child => bold(child, details_flag));
}

let highlight = searchParams.get('highlight');
if (highlight) {
    let h1 = document.getElementsByTagName('h1')[0];
    h1.innerHTML += ' <a href="#highlight">→</a>'
    let main = document.getElementsByTagName('main')[0];
    bolden = RegExp('(\\W|^)(' + `${highlight}` + ')(\\W|$)', 'ig');
    bold(main);
}

let term = searchParams.get('term')
if (term) {
    window.location.href = `/special/search.html?term=${term}`;
}
let word = searchParams.get('word')
if (word) {
    window.location.href = '/lex/' + sellCaps(word) + '.html';
}
