styles:
  nav:
    type: block
    open: <nav class="main">
  input:
    type: complete
  label:
    type: line
  ul:
    type: block
    start: <li>
    end: </li>
  link:
    type: link
  javascript:
    type: div
  strong:
    props:
      bold: true
  search-form:
    type: block
    open: <form id="search">
    close: </form>
    start: <li class="search">
    end: </li>
  button: {}
  submit-button:
    type: inline
    open: <button type="button">
    close: </button>
  links:
    type: div
  entry-data:
    type: data
  a:
    type: anchor
  random:
    type: div
  details:
    open: <details open>
    type: block
  summary:
    type: line
  nav-links:
    type: div
  toc:
    type: toc
    open: <ul>
    close: </ul>
    start: <li>
    end: </li>
    pipe: '">'
    param: <a href="$link$">$name$</a>
text:
- <nav><details><summary>Menu</summary>
- <ul><a><link>index</link>|<entry-data>root</entry-data></a>
- <javascript><search-form><input>type="text" name="term"</input>
- <button>Search</button></search-form></javascript><nav-links><toc>matriarchs-siblings-descendants</toc></nav-links></ul></details></nav>
