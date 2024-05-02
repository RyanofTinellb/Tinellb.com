text:
- <!DOCTYPE html>
- <html>
- "\t<head>"
- "\t\t<meta charset=\"UTF-8\">"
- "\t\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">"
- "\t\t<link rel=\"stylesheet\" type=\"text/css\" href=\"style.css\">"
- "\t\t<link rel=\"icon\" type=\"image/png\" href=\"favicon.png\">"
- "\t\t<title>Search Tinellbian Languages</title>"
- "\t</head>"
- "\t<body>"
- "\t\t<flex>"
- "\t\t\t<nav-header>"
- "\t\t\t\t<ul>"
- "\t\t\t\t\t<li><a href=\"index.html\">The Tinellbian Languages</a></li>"
- "\t\t\t\t\t<ul class=\"level-1\">"
- "\t\t\t\t\t\t<li><a href=\"http://grammar.tinellb.com\">Grammar Guide</a></li>"
- "\t\t\t\t\t\t<li><a href=\"http://dictionary.tinellb.com\">Tinellbian Dictionary</a></li>"
- "\t\t\t\t\t</ul>"
- "\t\t\t\t\t<li class=\"normal\">Search the Site</li>"
- "\t\t\t\t\t<li><a href=\"about.html\">About / Contact</a></li>"
- "\t\t\t\t</ul>"
- ''
- "\t\t\t</nav-header>"
- "\t\t\t<main>"
- "\t\t\t\t<h1>Search the Entire Site</h1>"
- "\t\t\t\t<p>"
- "\t\t\t\t\t<input type=\"radio\" name=\"section\" id=\"grammar\" value=\"grammar\"\
  >Grammar"
- "\t\t\t\t\t<input type=\"radio\" name=\"section\" id=\"dictionary\" value=\"dictionary\"\
  \ checked=\"true\">Dictionary"
- "\t\t\t\t\t<input type=\"text\" class=\"term\" id=\"term\" name=\"term\" placeholder=\"\
  Search...\" onKeyDown=\"if(event.keyCode == 13) {search();}\"><br><br>"
- "\t\t\t\t\t<input type=\"submit\" class=\"submit\" value=\"Search\" onClick=\"search()\"\
  >"
- "\t\t\t\t\t<input type=\"radio\" name=\"andor\" id=\"and\" value=\"and\" checked=\"\
  true\">AND"
- "\t\t\t\t\t<input type=\"radio\" name=\"andor\" id=\"or\" value=\"or\">OR"
- "\t\t\t\t</p>"
- "\t\t\t\t<script>"
- ''
- "\t\t\t\t\tfunction search() {"
- "\t\t\t\t\t\tif (dictionary.checked) {section = \"dictionary\"}"
- "\t\t\t\t\t\telse {section = \"grammar\"};"
- "\t\t\t\t\t\tif (and.checked) {andor = \"and\"} else {andor = \"or\"};"
- "\t\t\t\t\t\tterms = document.getElementById(\"term\").value.split(\" \").join(\"\
  +\")"
- "\t\t\t\t\t\taddress = \"http://\" + section + \".tinellb.com/search.html?term=\"\
  \ + terms + \"&\""
- "\t\t\t\t\t\taddress += \"andor=\" + andor;"
- "\t\t\t\t\t\twindow.open(address, \"_self\", false);"
- "\t\t\t\t\t}"
- "\t\t\t\t</script>"
- "\t\t\t</main>"
- "\t\t</flex>"
- "\t</body>"
- </html>
styles: {}
