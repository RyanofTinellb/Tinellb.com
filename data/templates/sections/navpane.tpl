styles:
  a: anchor
  button:
    open: <button type="submit" aria-label="search">
  details#menu: block
  entry-data: data
  form|search: line
  input: complete
  javascript: div
  label:
    open: <label for="
    pipe: '">'
    type: line
  link: link
  links: div
  nav-links: div
  nav|main: block
  random: div
  strong: {}
  summary: line
  svg: template
  toc:
    close: </ul>
    end: </li>
    open: <ul>
    param: <a href="$link$">$name$</a>
    pipe: '">'
    start: <li>
    type: toc
  ul: ul
templates:
  magnifying glass: c:\users\ryan\tinellbianlanguages\toplevel\data\templates\svg\magnifying glass.tpl
text:
- <nav|main><details#menu><summary>Menu</summary>
- <a><link>index</link>|<entry-data>root</entry-data></a>
- '<javascript><form|search><label>search|Search: </label><input>type="text" name="term" id="search"</input><button><svg>magnifying glass</svg></button></form|search></javascript><nav-links><toc>aunts-siblings-heirs-lineage-children</toc></nav-links></details#menu></nav|main>'
