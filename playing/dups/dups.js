let box = document.getElementById("actors");
let roles = document.getElementById("roles");
let seriesOne = document.getElementById("showOne");
let seriesTwo = document.getElementById("showTwo");
let textShows = document.getElementById("textShows");
let textOne = document.getElementById("textOne");
let textTwo = document.getElementById("textTwo");
let serieses = new Set();
let data;
let namesList = [];
let showOneList = [];
let showTwoList = [];

async function fillCombos() {
    data = await fetch("dups.json");
    data = await data.json();
    data.forEach(name => addSeries(name[1]));
    serieses = Array.from(serieses);
    serieses.sort();
    addSerieses();
    data.sort((a, b) => subtract(getSurname(a[0]), getSurname(b[0])));
    console.log(data);
    let names = data.map(obj => obj[0]);
    names.forEach(name => addName(name));
}

subtract = (a, b) => a == b ? 0 : a > b ? 1 : -1;

function getSurname(name) {
    name = name.split(" ");
    return name[name.length - 1];
}

function addName(name) {
    let option = document.createElement("option");
    option.text = name
    namesList.push(option);
}

function addSeries(name) {
    for (let series in name) {
        serieses.add(series);
    }
}

function addSerieses() {
    for (let series of serieses) {
        let option = document.createElement("option");
        option.text = series;
        showOneList.push(option);
        option = document.createElement("option");
        option.text = series;
        showTwoList.push(option);
    }
}

function select() {
    let name = box.value;
    roles.innerHTML = "";
    for (let actor of data) {
        if (actor[0] != name) { continue; }
        Object.entries(actor[1]).forEach(a => createTable(a[0], a[1]));
    }
}

function createTable(term, definition) {
    let dd = document.createElement("dt");
    dd.innerHTML = term;
    let dt = document.createElement("dd");
    dt.innerHTML = definition;
    roles.append(dd);
    roles.append(dt);
}

function filterShows() {
    box.innerHTML = "";
    let value = textShows.value.toLowerCase();
    let list = namesList.filter(a => a.text.toLowerCase().includes(value));
    list.forEach(a => box.add(a));
    select();
}

function filterOne() {
    seriesOne.innerHTML = "";
    let value = textOne.value.toLowerCase();
    let list = showOneList.filter(a => a.text.toLowerCase().includes(value));
    list.forEach(a => seriesOne.add(a));
    shows();
}

function filterTwo() {
    seriesTwo.innerHTML = "";
    let value = textTwo.value.toLowerCase();
    let list = showTwoList.filter(a => a.text.toLowerCase().includes(value));
    list.forEach(a => seriesTwo.add(a));
    shows();
}

function shows() {
    let one = seriesOne.value;
    let two = seriesTwo.value;
    let d = data.filter(a => a[1].hasOwnProperty(one) && a[1].hasOwnProperty(two));
    roles.innerHTML = "";
    if (one == two) {
        for (let actor of d) {
            console.log(actor);
            k = Array.from(Object.entries(actor[1])).map(a => a.toReversed().join(' (') + ')');
            console.log(k);
            createTable(actor[0], k.join('<br>'));
        }
    } else {
        for (let actor of d) {
            console.log(actor);
            createTable(actor[0], actor[1][one] + '<br>' + actor[1][two]);
        }
    }
}