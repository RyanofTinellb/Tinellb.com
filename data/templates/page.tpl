styles:
  '!doctype':
    type: complete
  body:
    type: block
    start: <p>
    end: </p>
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
  h1:
    type: heading
    param: null
    open: <h1>
    start: ' '
    end: ' '
  head:
    type: block
  html:
    type: block
    language: true
  inline-script:
    type: line
    open: <script>
    close: </script>
  input:
    type: complete
  internal-link:
    type: link
  javascript:
    type: line
  link:
    type: complete
  main:
    type: block
  meta:
    type: complete
  main-page:
    type: div
  script:
    type: complete
    close: '></script>'
  table-of-contents:
    type: toc
    open: <div class="toc">
    close: </div>
    start: <p>
    end: </p>
    param: <a href="$link$">$name$</a>
  template:
    type: template
    rank: -50
  title:
    type: line
text:
- <!doctype>html</!doctype>
- <html@en><head><meta>name="viewport" content="width=device-width/initial-scale=1.0"</meta>
- <meta>charset="utf-8"</meta>
- <title><entry-data>name</entry-data></title>
- <link>rel="stylesheet" type="text/css" href="<internal-link>data/stylesheets/basic_style.css</internal-link>"</link>
- <link>rel="stylesheet" type="text/css" href="<internal-link>data/stylesheets/style.css</internal-link>"</link>
- <link>rel="icon" type="image/png" href="<internal-link>data/assets/favicon.png</internal-link>"</link>
- <script>src="<internal-link>data/scripts/search.js</internal-link>"</script></head>
- <body><flex><template>navigation pane</template>
- <main-page><template>mini-nav</template><main><h1><data>name</data></h1>
- <data>contents</data><table-of-contents>children</table-of-contents></main>
- <template>mini-nav</template></main-page></flex>
- <footer><template>copyright</template></footer>
- <script>src="<internal-link>data/scripts/parse_href.js</internal-link>"</script>
- <inline-script>
- for (elt of document.getElementsByClassName('javascript')) {
- elt.style.display = "block";}</inline-script></body></html@en>
