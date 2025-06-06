styles:
  '!doctype': complete
  body:
    type: block
    sep: p
  data: data
  flex: div
  footer: block
  head: block
  html:
    language: true
    type: block
  inline-script:
    close: </script>
    open: <script>
    type: line
  input: complete
  internal-link: link
  javascript: line
  link: complete
  main: block
  meta: complete
  primary: div
  script:
    close: '></script>'
    type: complete
  template: template
  title: block
text:
- <!doctype>html</!doctype>
- <html@en><head><meta>name="viewport" content="width=device-width/initial-scale=1.0"</meta>
- <meta>charset="utf-8"</meta>
- <title><data>title</data></title>
- <link>rel="stylesheet" type="text/css" href="<internal-link>data/stylesheets/basic_style.css</internal-link>"</link>
- <link>rel="stylesheet" type="text/css" href="<internal-link>data/stylesheets/style.css</internal-link>"</link>
- <link>rel="icon" type="image/png" href="<internal-link>data/assets/favicon.png</internal-link>"</link>
- <script>src="<internal-link>data/scripts/parse_href.js</internal-link>"</script></head>
- <body><flex><template>navigation pane</template>
- <primary><template>mini-nav</template><main><template>main</template><template>jump to entry</template></main>
- <template>mini-nav</template></primary></flex>
- <footer><template>copyright</template></footer>
- <script>src="<internal-link>data/scripts/search.js</internal-link>"</script>
- <script>src="<internal-link>data/scripts/localise_links.js</internal-link>"</script>
- <inline-script>
- 'let mql = window.matchMedia("(min-width: 800px)");'
- let details = document.getElementById("menu");
- if(mql.matches) { details.open = true;}
- for (elt of document.getElementsByClassName('javascript')) {
- elt.style.display = "block";}</inline-script></body></html@en>
