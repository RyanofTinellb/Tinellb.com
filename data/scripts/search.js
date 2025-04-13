const SEARCHBOX = document.getElementById('searchbox');
const SEARCH = document.getElementById('search');
const WORDSEARCH = document.getElementById('wordsearch');
const RESULTS = document.getElementById('results')

const len = arr => arr.length;

if (RESULTS) {
    RESULTS.innerHTML = 'Searching...';
    let query = decodeURI(getTerms());
    if (SEARCHBOX) SEARCHBOX.value = query;
    if (SEARCH) SEARCH.value = query;
    search(query.split(' '));
}

function getTerms() {
    let query = searchParams.get('query');
    if (query) return query;
    let url = window.location.pathname.split('/');
    if (url[len(url) - 1] == 'index.html') return url[len(url) - 2]
    return url[len(url) - 1].replace('.html', '')
}


async function search(terms) {
    let data = await fetch("/data/assets/searching.json");
    data = await data.json();
    if (!terms.length) {
        arr = [];
    } else if (terms.length == 1) {
        arr = oneTermSearch(data, terms);
    } else {
        arr = multiTermSearch(data, terms, true);
    }
    display(arr, data, "results", terms, true);
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

function multiTermSearch(arr, terms, andButton) {
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
    filter = andButton ? page => page.count === terms.length : page => true;
    return output.filter(filter);
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

function titleSearch(arr, terms, andButton) {
    console.log(arr);
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
    // filter = andButton ? name => name.count === terms.length : name =>
    filter = name => (andButton ? name.count === terms.length : name.count);
    names = names.filter(filter);
    return `<div class="title-results"><ul>${names.map(
        name => `<a href="/${name.url}">${name.name}</a></li>`
    ).join(';<br> ')}</ul></div>`;
}

function display(pages, data, id, terms, andButton) {
    let regexes = terms.map(term =>
        RegExp(`(${term}|${capitalise(term)})`, 'g'));
    document.getElementById(id).innerHTML = `${titleSearch(data, terms, andButton)}${!arr.length ? terms.join(' ') + " not found" :
        `<ol>${pages.map(page => {
            let pagenum = page.page;
            let link = data.urls[pagenum] + "?highlight=" + terms.join("+");
            let name = data.pages[pagenum];
            let lines = page.lines.map(
                linenum => embolden(regexes, data.lines[linenum]));
            return `<li><a href="../${link}">${name}</a>: ${lines.join(' &hellip; ')}</li>`;
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


let highlight = searchParams.get('highlight');
if (highlight) {
    let h1 = document.getElementsByTagName('h1')[0];
    h1.innerHTML += ' <a href="#highlight">→</a>'
    let main = document.getElementsByTagName('main')[0];
    bolden = RegExp('(\\W|^)(' + `${highlight}` + ')(\\W|$)', 'ig');
    bold(main);
}
