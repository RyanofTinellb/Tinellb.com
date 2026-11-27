a:
  param: $lookup$|$node$
  category: external
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
  cat: eplist
  end: ''
  param: <a href="#$text$"></a>
  props:
    colour: '#ff00dd'
  start: ''
  type: div
arrow-right:
  cat: eplist
  end: ''
  param: <a href="#$text$"></a>
  props:
    colour: '#ff00dd'
  start: ''
  type: div
checkbox:
  close: '">'
  open: <input type="checkbox" id="
  pipe: '" name="'
  props:
    background: '#ccffff'
  cat: eplist
cite:
  props:
    italics: true
default:
  block: default
  props:
    font: Dubai
    size: 18
desktop: span
dl:
  cat: list
  start: <dt>
  end: </dd>
  pipe: </dt><dd>
  props:
    background: '#ccccdd'
em:
  props:
    italics: true
eplist:
  cat: eplist
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
internal-link: link
javascript:
  cat: script
  type: div
label: block
label-for:
  cat: eplist
  close: </label>
  open: <label for="
  pipe: '">'
  props:
    background: '#ffccff'
mailto:
  close: </a>
  open: <a href="
  param: mailto:$text$|$node$
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
  cat: script
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
  param: id="$grammar(text)$" value="$grammar(text)$" title="$lookup$"|$node$
  category: sorts
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
  props:
    left: 15
  type: ul
