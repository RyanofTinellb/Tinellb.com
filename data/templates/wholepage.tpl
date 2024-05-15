text:
- <doctype>html</doctype>
- <html>
- <head>
- <meta>name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes"</meta>
- <meta>charset="utf-8"</meta>
- <title><param>category title</param> - Tinellbian Languages</title>
- <stylesheet>/basic_style.css</stylesheet>
- <stylesheet>/style.css</stylesheet>
- <icon>/favicon.png</icon>
- <template>search-script</template>
- </head>
- <body>
- <flex>
- <nav-pane>
- <template>family links</template>
- </nav-pane>
- <main>
- <template>nav-footer</template>
- <param>title heading</param>
- <param>wholepage contents</param>
- <template>toc</template>
- <template>copyright</template>
- <template>show javascript</template>
- <template>highlight search term</template>
- <template>scripts</template>
- </main>
- </flex>
- </body>
- </html>
styles:
  content:
    start: <div class="content">
    end: </div
  doctype:
    start: '<!DOCTYPE '
    end: '>'
  flex:
    start: <div class="flex">
    end: </div>
  icon:
    start: <link rel="icon" type="image/png" href="
    end: '">'
  meta:
    start: '<meta '
    end: '>'
  nav-pane:
    start: <div class="nav-pane">
    end: </div>
  stylesheet:
    start: <link rel="stylesheet" type="text/css" href="
    end: '"'
