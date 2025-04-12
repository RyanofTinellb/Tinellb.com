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
  nav|sidebar: block
  nav-links: div
  random: div
  strong: {}
  summary: line
  svg: template
  template: template
  toc:
    open: <ul>
    close: </ul>
    start: <li>
    end: </li>
    param: <a href="$link$">$name$</a>
    pipe: '">'
    type: toc
  ul: ul
templates:
  magnifying glass: c:\users\ryan\tinellbianlanguages\toplevel\data\templates\svg\magnifying glass.tpl
text:
- <nav|sidebar><details#menu><summary>Menu</summary>
- <a><link>index</link>|<entry-data>root</entry-data></a>
- '<javascript><form|search><label>search|Search: </label><input>type="text" name="query" id="search"</input><button><svg>magnifying glass</svg></button></form|search></javascript>'
- '<nav-links><toc>aunts-siblings-heirs-lineage-children</toc><template>random entry</template></nav-links></details#menu></nav|main>'
