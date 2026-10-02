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

const TARGET = window.location.pathname.split('.html')[0];
if (TARGET.match(/\/lex\//)) {
    const LEXEME = TARGET.match(/[\/\\]lex[\/\\](.*)/)[1];
    console.log(LEXEME);
    console.log(LEXEME.match(/(?<!%.{0,1})(.)/g));
    const NEW_TARGET = LEXEME.replaceAll(/(?<!%.{0,1})(.)/g, sellLetterCaps).replaceAll('%20', '.');
    if (NEW_TARGET !== LEXEME) {
        window.location.href = window.location.pathname.replace(/(?<=[\/\\]lex[\/\\]).*/, NEW_TARGET) + '.html';
    }
}
let term = searchParams.get('term')
if (term) {
    window.location.href = `/special/search.html?query=${term}`;
}
let word = searchParams.get('word')
if (word) {
    window.location.href = '/lex/' + sellCaps(word) + '.html';
}
