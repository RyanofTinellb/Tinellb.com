searchParams = new URLSearchParams(window.location.search);
console.log(searchParams);
let text = searchParams.get('highlight');
if (text) {
    let h1 = document.getElementsByTagName('h1')[0];
    h1.innerHTML += ' <a href="#highlight">→</a>'

    let main = document.getElementsByTagName('main')[0];
    console.log(main);
    let reg = RegExp('(\\W)(' + `${text}` + ')(\\W)', 'gi');
    console.log(reg);
    main.innerHTML = main.innerHTML.replace(reg, `$1<span id="highlight" class="highlight">$2</span>$3`);
}

let term = searchParams.get('term') 
if (term) {
    window.location.href = `/special/search.html?term=${term}`; 
}
