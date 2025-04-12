a:
  param: $link:lookup:external$|$text$
  props:
    colour: '#0000ff'
    underline: true
  type: anchor
anchor:
  close: </a>
  props:
    colour: '#3366ff'
  type: anchor
arrow-left:
  end: ''
  param: <a href="#$text$"></a>
  props:
    colour: '#ff00dd'
  start: ''
  type: div
arrow-right:
  end: ''
  param: <a href="#$text$"></a>
  props:
    colour: '#ff00dd'
  start: ''
  type: div
button: complete
checkbox:
  close: '">'
  open: <input type="checkbox" id="
  pipe: '" name="'
  props:
    background: '#ccffff'
cite:
  props:
    italics: true
default:
  block: default
  props:
    font: Dubai
    size: 18
desktop: span
em:
  props:
    italics: true
eplist:
  close: </slot>
  open: <slot class="eplist">
  props:
    background: '#ff9999'
  type: div
h1:
  type: heading
  keys:
    'on': 1
    'off': Return
  props:
    bold: true
    underline: true
    size: 150
h2:
  props:
    bottom: 15
    left: 50
    size: 120
    top: 15
  type: heading
h2-links:
  close: </h2>
  open: <h2>
  param: <a href="$link:lookup:external$">$node$</a>
  props:
    background: '#ccccdd'
    font: Gadugi
    size: 120
    top: 15
    underline: true
  type: heading
internal-link: link
javascript: div
label: block
label-for:
  close: </label>
  open: <label for="
  pipe: '">'
  props:
    background: '#ffccff'
mailto:
  close: </a>
  open: <a href="
  param: mailto:$text$|$text$
  pipe: '">'
  props:
    colour: '#339933'
    underline: true
  type: anchor
message:
  props:
    colour: '#ff0000'
    size: 95
  type: div
mobile: span
noscript:
  rank: 110
  type: block
script:
  close: '></script>'
  open: '<script '
  type: line
slot:
  open: <slot id="
  pipe: '">'
  props:
    colour: '#999933'
sort-button:
  close: </button>
  open: '<button type="submit" name="sort" '
  param: id="$url(text)$" value="$url(text)$" title="$lookup:sorts$"|$node$
  pipe: '>'
  type: line
sorts:
  close: </form>
  open: <form id="sorts" class="sorts">
  props:
    left: 25
  type: block
span:
  end: ''
  open: '<span '
  param: id="$text$">
  props:
    colour: '#339933'
    underline: true
  start: ''
  type: block
template: template
ul:
  end: </li>
  props:
    left: 15
  start: <li>
  type: block
