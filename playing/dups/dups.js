let box = document.getElementById("actors");
let roles = document.getElementById("roles");
let seriesOne = document.getElementById("showOne");
let seriesTwo = document.getElementById("showTwo");
let serieses = new Set();
let data;

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
    box.add(option)
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
        seriesOne.add(option);
        option = document.createElement("option");
        option.text = series;
        seriesTwo.add(option);
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

function shows() {
    let one = seriesOne.value;
    let two = seriesTwo.value;
    let d = data.filter(a => a[1].hasOwnProperty(one) && a[1].hasOwnProperty(two));
    roles.innerHTML = "";
    if (one == two) {
        for (let actor of d) {
            console.log(actor);
            createTable(actor[0], Array.from(Object.keys(actor[1])).join('<br>'));
        }
    } else {
        for (let actor of d) {
            console.log(actor);
            createTable(actor[0], actor[1][one] + '<br>' + actor[1][two]);
        }
    }
}