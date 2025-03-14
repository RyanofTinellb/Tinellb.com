styles: null
text:
- <script type="text/javascript">
- let href = window.location.href;
- if (href.indexOf("?") != -1 && href.indexOf("?highlight=") == -1 && href.indexOf("?series=") == -1 && href.indexOf("?sort=") == -1) {
- '    let term = href.replace(/(.*?\?)(.*?)(#.*|$)/, "$2");'
- '    window.location.href = `<link>/search.html</link>?${{term}}`;'
- '}'
- </script>
