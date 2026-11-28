styles:
  data: data
  h1: heading
  link: complete
  internal-link: link
  script:
    close: '></script>'
    type: complete
  repeat: repeat
title:
- <data>root</data>
text:
- <link>rel="stylesheet" type="text/css" href="<internal-link>data/stylesheets/counters.css</internal-link>"</link>
- <repeat><data>contents</data></repeat>
- <script>src="<internal-link>data/scripts/open_details.js</internal-link>"</script>