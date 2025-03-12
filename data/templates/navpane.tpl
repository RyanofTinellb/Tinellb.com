styles:
  a:
    type: anchor
  button: {}
  details:
    open: <details id="menu">
    type: block
  entry-data:
    type: data
  input:
    type: complete
  javascript:
    type: div
  label:
    type: line
  link:
    type: link
  links:
    type: div
  nav:
    open: <nav class="main">
    type: block
  nav-links:
    type: div
  random:
    type: div
  search-form:
    close: </form>
    open: <form id="search">
    type: block
  strong:
    props:
      bold: true
  submit-button:
    close: </button>
    open: <button type="button">
    type: inline
  summary:
    type: line
  toc:
    close: </ul>
    end: </li>
    open: <ul>
    param: <a href="$link$">$name$</a>
    pipe: '">'
    start: <li>
    type: toc
  ul:
    end: </li>
    start: <li>
    type: block
text:
- <nav><details><summary>Menu</summary>
- <a><link>index</link>|<entry-data>root</entry-data></a>
- <javascript><search-form><input>type="text" name="term"</input>
- <button>Search</button></search-form></javascript><nav-links><toc>aunts-siblings-heirs-lineage-children</toc></nav-links></details></nav>
