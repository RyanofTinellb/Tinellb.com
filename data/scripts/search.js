const SEARCHBOX = document.getElementById('searchbox');
const SEARCH = document.getElementById('search');
const WORDSEARCH = document.getElementById('wordsearch');
const RESULTS = document.getElementById('results')

const WORDLIST = '/data/assets/wordlist.json'
const STANDARDSEARCH = '/data/assets/searching.json'

const LANGUAGES = [
    'english', 'lulani', 'high', 'demotic', 'fezhlê', 'early', 'late', 'koine',
    'ptokan', 'old', 'middle', 'new', 'brequèn', 'primitive', 'archaic',
    'common', 'zhaladi', 'proto', 'contemporary', 'reformed', 'tsarin',
    'classical', 'modern', 'solajin', 'ancient', 'medieval', 'traditional', 'standard'
]


const len = arr => arr.length;
const displayWords = entries => entries.length ? `<ul>${entries.map(createLine).join('')}</ul>` : '';
const languageCode = entry => entry.l.toLowerCase().split(' ').map(lang => lang.charAt(0)).join('');
const createUrl = text => `${sellCaps(text)}.html`

const createLine = entry => `<li><a href="../lex/${createUrl(entry.t)}">${entry.t}</a> `
    + (entry.n ? `<span class="tinellbian" lang="x-tlb-${languageCode(entry)}">${entry.n}</span> ` : '')
    + `(${entry.l}) <em>${entry.d}</em></li>`;

if (RESULTS) {
    RESULTS.innerHTML = 'Searching...';
    let query = decodeURI(getTerms());
    if (SEARCHBOX) SEARCHBOX.value = query;
    if (SEARCH) SEARCH.value = query;
    wordsearch(query.split(' '));
}

function getTerms() {
    let query = searchParams.get('query');
    if (query) return query;
    let url = window.location.pathname.split('/');
    if (url[len(url) - 1] == 'index.html') return url[len(url) - 2]
    return url[len(url) - 1].replace('.html', '')
}

async function wordsearch(terms) {
    let results;
    let data = await fetch(WORDLIST);
    if (data.status == 404) { RESULTS.innerHTML = await standardSearch(terms); return; }
    data = await data.json();
    results = [translit, pos_lang, def_lang, native_script]
        .map(fn => displayWords(fn(data, terms)))
        .filter(entry => entry.length)
        .sort((a, b) => a.length - b.length)
        .join('');
    RESULTS.innerHTML = results.length ? results : await standardSearch(terms);
}

async function standardSearch(terms) {
    let data = await fetch(STANDARDSEARCH);
    data = await data.json();
    if (!terms.length) {
        arr = [];
    } else if (terms.length == 1) {
        arr = oneTermSearch(data, terms);
    } else {
        arr = multiTermSearch(data, terms);
    }
    return display(arr, data, terms);
}

function unique(arr) {
    return arr.filter(
        (item, pos, ary) => !pos || item !== ary[pos - 1]
    );
}

function uniquePageNumbers(pages) {
    return pages.map(page => {
        page.lines = unique(page.lines.sort());
        return page;
    });
}

function multiTermSearch(arr, terms) {
    let pages = [].concat(...terms.map(term => oneTermSearch(arr, term)));
    pages.sort((a, b) => a.page - b.page);
    let output = [];
    let current = undefined;
    for (let page of pages) {
        if (current && page.page === current.page) {
            current.lines.push(...page.lines);
            current.count++;
        } else {
            if (current) { output.push(current); }
            current = { page: page.page, lines: page.lines, count: 1 };
        }
    }
    output = uniquePageNumbers(output);
    return output.filter(page => page.count);
}

function oneTermSearch(arr, term) {
    pages = arr.terms[term];
    text = [];
    for (page in pages) {
        text.push({
            page: parseInt(page),
            lines: pages[page].map(line => parseInt(line))
        });
    }
    return text;
}

// capitalises first letter
function capitalise(string) {
    if (string.length == 0) {
        return ''
    }
    if (string.startsWith('&rsquo;')) {
        return string.replace('&rsquo;', '&#x294;');
    } else {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}

function titleSearch(arr, terms) {
    let names = arr.pages.map((elt, i) => ({
        name: elt,
        url: arr.urls[i],
        count: 0,
    }));
    terms.forEach(term => {
        names.forEach(name => {
            if (name.name.toLowerCase().includes(term)) { name.count++; }
        });
    });
    numTerms = terms.length;
    names = names.filter(name => name.count === terms.length);
    return names.length ? `<div class="title-results"><ul>${names.map(
        name => `<li><a href="/${name.url}">${name.name}</a></li>`
    ).join('')}</ul></div>` : '';
}

function display(pages, data, terms) {
    let regexes = terms.map(term =>
        RegExp(`(${term}|${capitalise(term)})`, 'g'));
    return `${titleSearch(data, terms)}${!arr.length ? terms.join(' ') + " not found" :
        `<ol>${pages.map(page => {
            let pagenum = page.page;
            let link = data.urls[pagenum] + "?highlight=" + terms.join("+");
            let name = data.pages[pagenum];
            let lines = page.lines.map(
                linenum => embolden(regexes, data.lines[linenum]));
            return `<li><a href="../${link}#highlight">${name}</a>: ${lines.join(' &hellip; ')}</li>`;
        }).join('')}</ol>`}`;
}

function embolden(terms, line) {
    terms.forEach(term => {
        line = line.replace(term, '<b>$1</b>');
    });
    return line;
}

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

function pos_lang(data, terms, back) {
    terms = terms.map(keep_hyphen);
    let totalLength = data.length;
    if (includesAll(LANGUAGES, terms)) {
        return [];
    }
    for (let term of terms) {
        let neg = term.charAt(0) == '-' ? a => !a : a => a;
        term = term.replace(/^-/, '');
        let arr = data.filter(entry => neg(entry.p.split(' ').includes(term)));
        if (!arr.length || arr.length == data.length) {
            arr = data.filter(entry => neg(language(entry).includes(term)));
        }
        if (!arr.length && !back) {
            return pos_lang(data, terms.reverse(), true)
        } else {
            data = arr;
        }
    }
    if (data.length == totalLength) {
        return [];
    }
    return data;
}

function def_lang(data, terms) {
    terms = terms.map(keep_quotes);
    for (let term of terms) {
        quote = term.search('"') != -1;
        term = term.replace(/"/g, '');
        if (!term) {
            return [];
        }
        data = data.filter(entry => entry.d.split(/[ ;]/).map(
            word => word.toLowerCase()
        ).includes(term) ||
            (quote ? false : language(entry).includes(term)));
        if (!data.length) {
            break;
        }
    }
    return data;
}

function native_script(data, terms) {
    for (let term of terms) {
        data = data.filter(entry => entry.n == term);
        if (!data.length) {
            break;
        }
    }
    return data;
}

function language(entry) {
    return entry.l.toLowerCase().split(' ');
}

function translit(data, terms) {
    return data.filter(entry =>
        includesAll(entry.t.split(' ').map(word => word.toLowerCase().replace('-', '')), terms.map(word => word.toLowerCase().replace('-', ''))));
}

function keep_quotes(text) {
    return text.toLowerCase().replace(/[^a-z'" ]/g, '');
}

function keep_hyphen(text) {
    return text.toLowerCase().replace(/[^a-z-' ]/g, '')
}

function includesAll(entry, terms) {
    return terms.every(term => entry.includes(term));
}

function includesSome(entry, terms) {
    return terms.some(term => entry.includes(term));
}


let highlight = searchParams.get('highlight');
if (highlight) {
    let h1 = document.getElementsByTagName('h1')[0];
    h1.innerHTML += ' <a href="#highlight">→</a>'
    let main = document.getElementsByTagName('main')[0];
    bolden = RegExp('(\\W|^)(' + `${highlight}` + ')(\\W|$)', 'ig');
    bold(main);
}
