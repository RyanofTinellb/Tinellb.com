const CHANGES = {
    dictionary: 23104,
    coelacanthquartet: 40890,
    universe: 56070,
    grammar: 20025,
    www: 40460
};
let changer = RegExp(`https*://(.*?).tinellb.com`);
const href = window.location.href;
if (href.includes('localhost')) {
    Array.from(document.getElementsByTagName('a')).forEach(anchor => {
        anchor.href = anchor.href.replace(/https*:\/\/(.*?).tinellb.com/, (match, subsite) => `//localhost:${CHANGES[subsite]}`);
    })
}