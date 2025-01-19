default:
  props:
    font: Dubai
    size: 18
  block: default
a:
  type: anchor
  param: $lookup:external$|$text$
  props:
    underline: true
    colour: '#0000ff'
anchor:
  type: anchor
  close: </a>
  props:
    colour: '#3366ff'
arrow-left:
  type: div
  param: <a href="#$text$"></a>
  start: ''
  end: ''
  props:
    colour: '#ff00dd'
arrow-right:
  type: div
  param: <a href="#$text$"></a>
  start: ''
  end: ''
  props:
    colour: '#ff00dd'
button:
  type: complete
checkbox:
  open: '<input type="checkbox" id="'
  pipe: '" name="'
  close: '">'
  props:
    background: '#ccffff'
cite:
  props:
    italics: true
desktop:
  type: span
em:
  props:
    italics: true
eplist:
  type: div
  open: <slot class="eplist">
  close: </slot>
  props:
    background: '#ff9999'
h2:
  type: heading
  props:
    size: 120
    top: 15
    bottom: 15
    left: 50
h2-links:
  type: heading
  open: <h2>
  close: </h2>
  param: <a href="$link:lookup:external$">$node$</a>
  props:
    font: Gadugi
    size: 120
    underline: true
    top: 15
    background: '#ccccdd'
internal-link:
  type: link
javascript:
  type: div
label:
  type: block
label-for:
  open: <label for="
  pipe: '">'
  close: </label>
  props:
    background: '#ffccff'
mailto:
  type: anchor
  open: <a href="
  pipe: '">' 
  close: </a>
  param: mailto:$text$|$text$
  props:
    underline: true
    colour: '#339933'
message:
  type: div
  props:
    colour: '#ff0000'
    size: 95
mobile:
  type: span
noscript:
  type: block
  rank: 110
script:
  type: line
  open: <script
  close: '></script>'
slot:
  open: <slot id="
  pipe: '">'
  props:
    colour: '#999933'
sort-button:
  type: line
  open: '<button type="submit" name="sort" '
  pipe: '>'
  close: </button>
  param: id="$url(text)$" value="$url(text)$" title="$lookup:sorts$"|$node$
sorts:
  type: block
  open: <form id="sorts" class="sorts">
  close: </form>
  props:
    left: 25
span:
  type: block
  open: <span
  param: id="$text$">
  start: ''
  end: ''
  props:
    colour: '#339933'
    underline: true
template:
  type: template
ul:
  type: block
  start: <li>
  end: </li>
  props:
    left: 15
