styles:
  a: anchor
  button:
    open: <button type="submit" aria-label="search">
  details#menu: block
  entry-data: data
  form|search: line
  input: complete
  javascript: div
  link: link
  links: div
  nav|sidebar: block
  nav-links: div
  random: div
  search: label
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
  magnifyingglass: c:\users\ryan\tinellbianlanguages\www\data\templates\svg\magnifying_glass.tpl
text:
- <nav|sidebar><details#menu><summary>Menu</summary>
- <a><link>index</link>|<entry-data>root</entry-data></a>
- '<javascript><form|search><search>Search: </search>'
- '<input>type="text" class="search" name="term" id="search"</input>'
- '<button><svg>magnifying glass</svg></button></form|search></javascript>'
- '<nav-links><toc>aunts-siblings-heirs-lineage-children</toc><template>random entry</template></nav-links></details#menu></nav|main>'
