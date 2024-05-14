styles:
  "!doctype":
    type: complete
  html:
    type: block
    language: true
  head:
    type: block
  meta:
    type: complete
  title:
    type: line
  h1:
    type: heading
    param: ''
    open: <h1>
  entry-data:
    type: data
  data:
    type: data
  link:
    type: complete
  internal-link:
    type: link
  inline-script:
    type: line
    open: <script>
    close: </script>
  script:
    type: complete
    close: "></script>"
  body:
    type: block
    start: <p>
    end: </p>
  main:
    type: block
  flex:
    type: div
  template:
    type: template
  content:
    type: div
  form:
    type: block
  javascript:
    type: line
  input:
    type: complete
  internal-script:
    type: line
    open: <script>
    close: </script>
  footer:
    type: block
  results:
    open: <div class="results" id="results"> 
    type: div
text:
  - <!doctype>html</!doctype>
  - <html@en><head><meta>name="viewport" content="width=device-width/initial-scale=1.0"</meta>
  - <meta>charset="utf-8"</meta>
  - <title>Search - <entry-data>root</entry-data></title>
  - <link>rel="stylesheet" type="text/css" href="<internal-link>data/stylesheets/basic_style.css</internal-link>"</link>
  - <link>rel="stylesheet" type="text/css" href="<internal-link>data/stylesheets/style.css</internal-link>"</link>
  - <link>rel="icon" type="image/png" href="<internal-link>data/assets/favicon.png</internal-link>"</link></head>
  - <body><flex><template>navigation pane</template>
  - <main><h1>Search – <entry-data>root</entry-data></h1>
  - <form><input>type="text" class="term" id="term" name="term" placeholder="Search..."</input>
  - <input>type="submit" class="submit" value="Search"</input></form>
  - <results>Searching...</results></main></flex>
  - <footer><template>copyright</template></footer>
  - <script>src="<internal-link>data/scripts/search.js</internal-link>"</script>
  - <inline-script>
  - for (elt of document.getElementsByClassName('javascript')) {
  - elt.style.display = "block";}</inline-script></body></html@en>
