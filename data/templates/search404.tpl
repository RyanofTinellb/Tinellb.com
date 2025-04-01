styles:
  data: data
  form|searchpage: block
  h1: heading
  input: complete
  results#results: div
text:
- <h1>Search – <data>root</data></h1>
- <form|searchpage><input>type="text" class="term" id="term" name="term" placeholder="Search..."</input>
- <input>type="submit" class="submit" value="Search"</input></form|searchpage>
- <results#results>Searching...</results#results>
