styles:
  a:
    type: anchor
  button:
    open: <button type="submit">
  details#menu:
    type: block
  entry-data:
    type: data
  form#search:
    type: line
  input:
    type: complete
  javascript:
    type: div
  label:
    type: line
    open: '<label for="'
    pipe: '">'
  link:
    type: link
  links:
    type: div
  nav|main:
    type: block
  nav-links:
    type: div
  random:
    type: div
  strong:
    props:
      bold: true
  summary:
    type: line
  svg:
    type: template
  toc:
    close: </ul>
    end: </li>
    open: <ul>
    param: <a href="$link$">$name$</a>
    pipe: '">'
    start: <li>
    type: toc
  ul:
    type: ul
templates:
  magnifying glass: c:\users\ryan\tinellbianlanguages\toplevel\data\templates\svg\magnifying glass.tpl
text:
  - <nav|main><details#menu><summary>Menu</summary>
  - <a><link>index</link>|<entry-data>root</entry-data></a>
  - '<javascript><form#search><label>term|Search: </label><input>type="text" name="term" id="term"</input><button><svg>magnifying glass</svg></button></form#search></javascript><nav-links><toc>aunts-siblings-heirs-lineage-children</toc></nav-links></details#menu></nav|main>'
