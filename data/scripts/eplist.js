const SORTS = {
    'airdate': AirdateSort,
    'calendar': CalendarSort,
    'default': DefaultSort,
    'title': EpNameSort,
    'length': EpnameLengthSort,
    'wallet': WalletSort,
    'random': RandomSort
};

const TYPES = {
    'films': 'Film',
    'movies': 'Movie',
    'miniseries': 'Miniseries',
    'premieres': 'Premiere',
    'finales': 'Finale',
    'starts': 'Start',
    'ends': 'End',
    'specials': 'Special',
    'gaps': 'Gap'
}

const ALLOWED_SORTS = ['airdate', 'calendar', 'default', 'title', 'length', 'wallet', 'random'];

const ALLOWED_TYPES = [
    'films', 'movies', 'miniseries', 'premieres', 'finales', 'starts', 'ends', 'specials', 'gaps']

appendControlsToNavPane();
let eplist = document.getElementsByClassName("eplist")[0];
let numEps = document.getElementById("numEps");
let data;
let showSeriesName = document.getElementById('series');
openEpList();

function appendControlsToNavPane() {
    let sorts = document.getElementById('sorts');
    let navMenu = document.getElementsByClassName('main')[0].children[0];
    navMenu.innerHTML += sorts.outerHTML;
    sorts.innerHTML = '';
}

const NUMBERS = ["no", "one", "two", "three", "four", "five", "six", "seven", "eight",
    "nine", "ten", "eleven", "twelve"];

async function updateNumbers() {
    let numberofeps = data.length;
    let time = numberofeps / 3 / 365.25;
    let years = Math.floor(time);
    let months = Math.floor(12 * (time - years));

    let sentence = `${numberofeps} episodes, or ${NUMBERS[years]} years`;
    switch (months) {
        case 0:
            break;
        case 1:
            sentence += " and one month";
            break;
        default:
            sentence += ` and ${NUMBERS[months]} months`
    }

    numEps.innerHTML = sentence;
}

const WALLETS = {
    "Red Covered Wallet": "A",
    "Big Black Box": "B",
    "Pink and Light Grey Wallet": "C",
    "Black Leather Wallet": "D",
    "Yellow Wallet": "E",
    "Silver Box": "F",
    "Dark Blue Wallet": "G",
    "Brown Leather Wallet": "H",
    "Silver Wallet": "L",
    "Brown Box": "M",
    "Dark Blue Covered Wallet": "P",
    "Blue and Dark Gray Wallet": "R",
    "Black Box": "T",
    "Velcro Tabbed Black Wallet": "U",
    "Khaki Camoflage Covered Wallet": "W"
};

const MONTHS = [undefined, "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

defaultSelection = ep => ep.type != "Gap" && ep.type != "Special";
customSelection = items => ep => items.includes(ep.type);

async function openEpList() {
    searchParams = new URLSearchParams(window.location.search)
    let series = searchParams.get('series') == 'on';
    console.log(showSeriesName, series);
    showSeriesName.checked = series;
    let sortType = searchParams.get('sort');
    sortType = ALLOWED_SORTS.includes(sortType) ? SORTS[sortType] : DefaultSort
    let displayedItems = ALLOWED_TYPES.map(type => searchParams.get(type) == 'on' ? TYPES[type] : false)
        .filter(item => item);
    console.log(displayedItems);
    displayedItems.forEach(type => document.getElementById('show' + type).checked = true);
    data = await fetch("/data/assets/eplist.json");
    data = await data.json();
    data = data.filter(displayedItems.length ? customSelection(displayedItems) : defaultSelection);
    console.log(data);
    data.forEach((ep, index) => ep.index = index);
    makeList(sortType, series);
    updateNumbers();
}

function makeList(sortfn, series = true) {
    for (btn of document.getElementsByTagName("button")) {
        btn.classList.remove("selected");
    }
    sortfn();
    console.log(data);
    eplist.innerHTML = "<ol>" + data.map(ep => `<li style='color:hsl(${Colour(ep)} 100% 55%);'>${Names(ep, series)}<span class="hidden-info">,&nbsp;aired:&nbsp;${airdate(...parseDate(ep))} space: ${ep.location.space}</span></li>`).join("\n") + "</ol>";
}

Colour = ep => Math.floor(360 / data.length * ep.index)

function AirdateSort() {
    document.getElementById("airdate").classList.add("selected");
    data.sort((a, b) => {
        if (a.date > b.date) {
            return 1
        } else if (a.date < b.date) {
            return -1
        } else return a.ep.number - b.ep.number;
    });
}

function WalletSort() {
    document.getElementById("wallet").classList.add("selected");
    let output = '';
    data.forEach(ep => {
        if (!ep.location) {
            console.log(ep);
        }
        let wallet = ep.location.wallet || ep.location;
        ep.SPACE = ep.location.space || 0;
        ep.WALLET = WALLETS[wallet];
    });
    data.sort((a, b) => subtract(a.WALLET, b.WALLET) || a.SPACE - b.SPACE)
}

function DefaultSort() {
    document.getElementById("default").classList.add("selected");
    data.sort((a, b) => a.index - b.index);
}

function EpnameLengthSort() {
    document.getElementById("length").classList.add("selected");
    data.forEach(ep => {
        let article = ep.ep.article || '';
        let pad = article ? ' ' : ''
        let epname = ep.ep.name || ep.ep;
        ep.EPNAME = `${article}${pad}${epname}`.split('').reverse().join('');
        ep.LEN = ep.EPNAME.length;
    });
    data.sort((a, b) => (a.LEN - b.LEN) || subtract(a.EPNAME, b.EPNAME))
}

subtract = (a, b) => a == b ? 0 : a > b ? 1 : -1;

function reverseString(str) {
    function reverseString(str) {
        return str.split("").reverse().join("");
    }
}

function RandomSort() {
    document.getElementById("random").classList.add("selected");
    shuffle(data);
}

function EpNameSort() {
    document.getElementById("title").classList.add("selected");
    data.forEach(ep => {
        ep.EPNAME = (ep.ep.name || ep.ep).toLowerCase();
    });
    data.sort((a, b) => {
        if (a.EPNAME > b.EPNAME) {
            return 1
        } else if (a.EPNAME < b.EPNAME) {
            return -1
        } else return 0;
    });
}

function CalendarSort() {
    document.getElementById("calendar").classList.add("selected");
    counts = {};
    data.forEach(ep => {
        let [year, month, day] = parseDate(ep);
        ep.DATE = `${pad(month)}${pad(day)}${WeekDay(year, month, day)}`;
        counts[ep.DATE] = counts[ep.DATE] ? counts[ep.DATE] + 1 : 1
    });
    data.sort((a, b) => a.DATE - b.DATE);
    counts = Object.entries(counts);
    counts.sort((a, b) => a[1] - b[1]);
}

function WeekDay(year, month, day) {
    let century = (Math.floor(year / 100) % 4) * -2;
    let isleap = ((year % 4 == 0) && (year % 100 != 0) || (year % 400 == 0));
    year = year % 100;
    let leap = Math.floor(year / 4);
    isleap = isleap && (month <= 2) ? -1 : 0;
    month = [undefined, -1, 2, 2, -2, 0, 3, -2, 1, -3, -1, 2, -3][month];
    return (century + year + leap + isleap + month + day + 700) % 7
}

function Names(ep, series) {
    return `<span class="${ep.type}${Combo(ep)}">${Name(ep, series)}</span>`;
}

let Combo = ep => ep.multi?.ordinal > 1 ? ' Iso' : '';

let Name = (ep, series) => series ? NameWithSeries(ep) : NameWithoutSeries(ep);

let SeasonName = season => (season === undefined || typeof season === "number") ?
    '' : ` - ${season.name || season} `;

function NameWithSeries(ep) {
    let seriesname = SeriesName(ep);
    let seasonname = SeasonName(ep.season);
    let punctuation = seriesname && !seasonname ? (series ? ' ' : ' - ') : '';
    return `${seriesname}${punctuation}${seasonname}${Numbers(ep)} ${Multi(ep)}${Episode(ep, seriesname)}`
}

function NameWithoutSeries(ep) {
    let seriesname = SeriesName(ep);
    let seasonname = SeasonName(ep.season);
    let punctuation = seriesname && !seasonname ? (series ? ' ' : ' - ') : '';
    let punct2 = seasonname ? ' - ' : ''
    return `<span class="hidden-info">${seriesname}${punctuation}${seasonname}${punct2}</span>${Episode(ep)} ${Numbers(ep)}`

}

function Multi(ep) {
    let multi = ep.multi;
    if (multi === undefined || typeof multi === 'number') {
        return '';
    }
    if (typeof multi === "string") {
        return `${multi}: `;
    }
    return `${multi.name}: `

}

const Aka = aka => aka ? ` (${aka})` : '';

function Episode(ep, seriesname) {
    let article = ep.ep?.article === undefined ? "" : `${ep.ep.article}`;
    let aka = ep.ep?.aka === undefined ? "" : `${ep.ep.aka}`;
    let pad = !article ? '' :
        article.match(/[“…’#¡ (-]$/) ? '&NoBreak;' : ' ';
    let episode;
    switch (seriesname) {
        case 'The Librarians':
            article = article ? article[0].toLowerCase() + article.slice(1) : '';
            episode = `and ${article}${pad}${ep.ep.name}`;
            break;
        case 'Daria':
            episode = `in “${article}${pad}${ep.ep.name}”`;
            break;
        default:
            episode = ep.ep?.name === undefined ? (ep.ep || "") : `${article}${pad}${ep.ep.name}${Aka(aka)}`;
    }
    if (ep.meta == 'Star Trek') {
        episode = episode.replace(/(Enterprise|Voyager)/, '<i>$1</i>');
    }
    if (ep.meta == 'Stargate') {
        episode = episode.replace(/(Prometheus|Daedalus)/, '<i>$1</i>')
    }
    if (ep.series == 'Dark Matter') {
        episode = episode.replace(/(Raza)/, '<i>$1</i>')
    }
    episode = episode.replace(/^<i>(.*?)<\/i>$/, '$1')
    return typeof episode === "string" ? episode.replace(/(\w) /g, "$1&nbsp;") : episode;
}

const The = name => name ?
    (name.endsWith("(T)") ? "The " + name.slice(0, -4) : name) : '';

function SeriesName(ep) {
    let meta = ep.meta;
    let series = ep.series;
    switch (typeof series) {
        case "string": case "undefined":
            break;
        case "number":
            series = undefined;
            break;
        default:
            series = series.name;
    }
    meta = meta === undefined || meta.endsWith("verse") || series === "Yes, Prime Minister" ? '' : The(meta);
    series = The(series);
    let pad = series && meta ? ': ' : '';
    return meta + pad + series;
}

function BareSeriesName(ep) {
    let series = ep.series;
    switch (typeof series) {
        case "string": case "undefined":
            break;
        case "number":
            series = undefined;
            break;
        default:
            series = series.name;
    }
    return series || ep?.ep?.name;

}

function shuffle(arr) {
    for (let i = arr.length - 1; i > 1; i--) {
        let index = Math.floor(Math.random() * i);
        let temp = arr[index];
        arr[index] = arr[i];
        arr[i] = temp;
    }
}

function Numbers(ep) {
    let season = Season(ep.season);
    let number = pad(ep?.ep?.number, season);
    let padx = season && number ? 'x' : '';
    let section = Section(ep.multi);
    let code = `${season}${padx}${number}${section}`;
    let multi = typeof ep.multi === "number" ? ep.multi : '';
    code += multi ? `\\${multi}` : '';
    code = code.length >= 1 ? code : '';
    if (place(ep)) {
        if (code) {
            return `(${code}:${place(ep)})`;
        } else {
            return `(${place(ep)})`;
        }
    } else {
        return `(${code}) `
    }
}

Section = multi => (multi === undefined || typeof multi == "number") ? '' : chr(multi.ordinal + asc('a') - 1);
Season = season => (season === undefined || typeof season === "string") ? "" : (season.number || season);
asc = character => character.charCodeAt(0);
chr = code => String.fromCharCode(code);
pad = (num, req) => (req && num < 10 ? "0" : '') + (num || '');

function place(ep) {
    let location = ep.location;
    let wallet = "";
    let disc = "";
    let space = "";
    if (location === undefined) {
        return "";
    } else if (typeof location === "string") {
        wallet = WALLETS[location] || location;
    } else if (typeof location === "number") {
        disc = location || 0;
    } else {
        wallet = WALLETS[location.wallet] || location.wallet;
        disc = location.disc || 0;
        space = location.space || 0;
    }
    if (location.wallet.includes('Box')) {
        return `${space}${wallet}`;
    } else if (disc) {
        return `${disc}${wallet}`;
    } else {
        return `${wallet}`;
    }
}

airdate = (year, month, day) => `${pad(day)}-${MONTHS[month]}-${year}`.replace(/-/g, "&#x2011;");

function parseDate(ep) {
    return [
        [0, 4],
        [4, 6],
        [6, 8]
    ].map(([a, b]) => parseInt(ep.date.substring(a, b)));
}
