styles:
  '!doctype':
    type: complete
  body:
    end: </p>
    start: <p>
    type: block
  content:
    type: div
  data:
    type: data
  entry-data:
    type: data
  flex:
    type: div
  footer:
    type: block
  form:
    type: block
  h1:
    open: <h1>
    param: ''
    type: heading
  head:
    type: block
  html:
    language: true
    type: block
  inline-script:
    close: </script>
    open: <script>
    type: line
  input:
    type: complete
  internal-link:
    type: link
  internal-script:
    close: </script>
    open: <script>
    type: line
  javascript:
    type: line
  link:
    type: complete
  main:
    type: block
  main-page:
    type: div
  meta:
    type: complete
  results:
    open: <div class="results" id="results">
    type: div
  script:
    close: '></script>'
    type: complete
  template:
    type: template
  title:
    type: line
text:
- <!doctype>html</!doctype>
- <html@en><head><meta>name="viewport" content="width=device-width/initial-scale=1.0"</meta>
- <meta>charset="utf-8"</meta>
- <title>Search - <entry-data>root</entry-data></title>
- <link>rel="stylesheet" type="text/css" href="<internal-link>data/stylesheets/basic_style.css</internal-link>"</link>
- <link>rel="stylesheet" type="text/css" href="<internal-link>data/stylesheets/style.css</internal-link>"</link>
- <link>rel="icon" type="image/png" href="<internal-link>data/assets/favicon.png</internal-link>"</link></head>
- <body><flex><template>navigation pane</template>
- <main-page><main><h1>Search – <entry-data>root</entry-data></h1>
- <form><input>type="text" class="term" id="term" name="term" placeholder="Search..."</input>
- <input>type="submit" class="submit" value="Search"</input></form>
- <results>Searching...</results></main></main-page></flex>
- <footer><template>copyright</template></footer>
- <script>src="<internal-link>data/scripts/search.js</internal-link>"</script>
- <inline-script>
- 'let mql = window.matchMedia("(min-width: 800px)");'
- let details = document.getElementById("menu");
- if (mql.matches) {details.open = true;}
- for (elt of document.getElementsByClassName('javascript')) {
- elt.style.display = "block";}</inline-script></body></html@en>
