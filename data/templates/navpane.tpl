styles:
  a:
    type: anchor
  button: {}
  details:
    open: <details open>
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
    type: block
    open: <nav class="main">
  nav-links:
    type: div
  random:
    type: div
  search-form:
    type: block
    open: <form id="search">
    close: </form>
    start: <li class="search">
    end: </li>
  strong:
    props:
      bold: true
  submit-button:
    type: inline
    open: <button type="button">
    close: </button>
  summary:
    type: line
  toc:
    type: toc
    open: <ul>
    close: </ul>
    start: <li>
    end: </li>
    pipe: '">'
    param: <a href="$link$">$name$</a>
  ul:
    type: block
    start: <li>
    end: </li>
text:
- <nav><details><summary>Menu</summary>
- <ul><a><link>index</link>|<entry-data>root</entry-data></a>
- <javascript><search-form><input>type="text" name="term"</input>
- <button>Search</button></search-form></javascript><nav-links><toc>matriarchs-siblings-heirs-lineage</toc></nav-links></ul></details></nav>
