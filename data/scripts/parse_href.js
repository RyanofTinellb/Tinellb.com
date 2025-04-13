let searchParams = new URLSearchParams(window.location.search);

const mapString = (str, fn) =>
    str.split('')
        .map((c, i) => fn(c, i, str))
        .join('');

// Changes space to period, and adds dollar-signs before capitals
const sellLetterCaps = letter =>
    letter == letter.toLowerCase() ? 
    letter == ' ' ? '.' : letter : `$${letter.toLowerCase()}`

function sellCaps(text) {
    return mapString(text, sellLetterCaps);
}

let term = searchParams.get('term')
if (term) {
    window.location.href = `/special/search.html?query=${term}`;
}
let word = searchParams.get('word')
if (word) {
    window.location.href = '/lex/' + sellCaps(word) + '.html';
}
