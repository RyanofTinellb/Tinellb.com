if (window.location.href.indexOf("?term=") != -1) {
    search();
}

function search() {
    document.getElementById("results").innerHTML = "Searching...";
    var url = "/data/assets/searching.json";
    var xmlhttp = new XMLHttpRequest();
    // var andButton = document.getElementById("and")
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let text = JSON.parse(this.responseText);
            let terms = getTerms();
            if (!terms.length) {
                arr = [];
            } else if (terms.length == 1) {
                arr = oneTermSearch(text, terms);
            } else {
                arr = multiTermSearch(text, terms, true);
            }
            display(arr, text, "results", terms, true);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

// returns array of terms
function getTerms() {
    var andOr;
    var url;
    var searchString;
    var text;
    url = window.location.href.split('?');
    searchString = decodeURI(url[1]).split("&");
    try {
        andOr = searchString.split("=")[1];
    } catch (err) {
        andOr = "and"
    }
    if (andOr == "or") {
        document.getElementById("or").checked = true
    }
    text = searchString[0].split("=")[1].toLowerCase();
    document.getElementById("term").value = text.split("+").join(" ");
    return text.split("+").filter(i => i != "");
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
            current = {page: page.page, lines: page.lines, count: 1};
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
    document.getElementById(id).innerHTML = `${titleSearch(data, terms, andButton)}${
    !arr.length ? terms.join(' ') + " not found" :
         `<ol>${pages.map(page => {
            let pagenum = page.page;
            let link = data.urls[pagenum] + "?highlight=" + terms.join("+");
            let name = data.pages[pagenum];
            let lines = page.lines.map(
                linenum => embolden(regexes, data.lines[linenum]));
            return `<li><a href="../${link}">${name}</a>: ${
                lines.join(' &hellip; ')}</li>`;
    }).join('')}</ol>`}`;
}

function embolden(terms, line) {
    terms.forEach(term => {
        line = line.replace(term, '<b>$1</b>');
    });
    return line;
}
