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
  h1:
    end: ' '
    open: <h1>
    param: null
    start: ' '
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
  script:
    close: '></script>'
    type: complete
  table-of-contents:
    close: </div>
    end: </p>
    open: <div class="toc">
    param: <a href="$link$">$name$</a>
    start: <p>
    type: toc
  template:
    rank: -50
    type: template
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
- <script>src="<internal-link>data/scripts/localise_links.js</internal-link>"</script>
- <inline-script>
- 'let mql = window.matchMedia("(min-width: 800px)");'
- let details = document.getElementById("menu");
- if(mql.matches) { details.open = true;}
- for (elt of document.getElementsByClassName('javascript')) {
- elt.style.display = "block";}</inline-script></body></html@en>
