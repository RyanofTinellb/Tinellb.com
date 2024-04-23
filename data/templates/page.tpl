{
    "text": [
        "<doctype>html</doctype>",
        "<html>",
        "<head>",
        "<meta>name=\"viewport\" content=\"width=device-width, initial-scale=1.0, user-scalable=yes\"</meta>",
        "<meta>charset=\"utf-8\"</meta>",
        "<title><param>category title</param> - Tinellbian Languages</title>",
        "<stylesheet>data/stylesheets/basic_style.css</stylesheet>",
        "<stylesheet>data/stylesheets/style.css</stylesheet>",
        "<icon>data/images/favicon.png</icon>",
        "<template>search script</template>",
        "</head>",
        "<body>",
        "<flex>",
        "<navpane>",
        "<template>family links</template>",
        "</navpane>",
        "<content>",
        "<param>nav-footer</param>",
        "<param>title heading</param>",
        "<data>contents</data>",
        "<param>toc</param>",
        "<template>copyright</template>",
        "<template>show javascript</template>",
        "<template>highlight search term</template>",
        "<param>scripts</param>",
        "</content>",
        "</flex>",
        "</body>",
        "</html>"
    ],
    "tagger": {
        "doctype": {
            "start": "<!DOCTYPE ",
            "end": ">"
        },
        "meta": {
            "start": "<meta ",
            "end": ">"
        },
        "flex": {
            "start": "<div class=\"flex\">",
            "end": "</div>"
        },
        "navpane": {
            "start": "<div class=\"nav-pane\">",
            "end": "</div>"
        },
        "content": {
            "start": "<div class=\"content\">",
            "end": "</div"
        },
        "icon": {
            "start": "<link rel=\"icon\" type=\"image/png\" href=\"/",
            "end": "\">",
            "hyperlink": true
        },
        "stylesheet": {
            "start": "<link rel=\"stylesheet\" type=\"text/css\" href=\"/",
            "end": "\">",
            "hyperlink": true
        }
    }
}