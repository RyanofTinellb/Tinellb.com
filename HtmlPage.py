from Directory import *
import os


class HtmlPage:
    # @param source_file (string): name of the markdown file
    # @param destination (string): name of the highest level folder to create
    # @param template_file (string): path to the template from which to build new pages
    # @param leaf_level (integer): the heading number for leaves of the directory
    # @param stylesheet (string): name of the css stylesheet
    def __init__(self, source_file, destination, template_file, stylesheet, leaf_level):
        self.directory = Directory(source_file, destination)
        self.template_file = template_file
        self.leaf_level = leaf_level
        self.content = []
        self.node = self.directory.hierarchy.root
        self.stylesheet = stylesheet
        with open(source_file, 'r') as source:
            line = source.readline()
            while line != "":
                if line[0] == "[":
                    try:
                        self.level = int(line[1])
                        if self.level <= self.leaf_level:
                            self.create_page()
                            self.content = []
                        self.node = self.directory.get_next_node(self.leaf_level)
                        if self.node.get_generation() <= leaf_level:
                            self.heading_node = self.node
                    except ValueError:
                        pass
                if line != "\n":
                    self.content.append(line[:-1])
                else:
                    self.content.append("\n")
                line = source.readline()
            self.create_page()

    def create_page(self):
        if len(self.content) == 0:
            return
        heading = int(self.content[0][1])
        with open(self.template_file, 'r') as template:
            page = ""
            text = template.readline()
            while text != "":
                text = text[:-1]
                if text[0] != "{":
                    page += text + "\n"
                elif text == "{title}":
                    page += self.get_title()
                elif text == "{toc}":
                    page += self.get_toc()
                elif text == "{menu}":
                    page += self.get_menu()
                elif text == "{stylesheet}":
                    page += self.get_stylesheet()
                elif text == "{content}":
                    page += self.get_content()
                text = template.readline()
        if heading < self.leaf_level:
            path = "/".join([self.name_in_url_form(node) for node in self.heading_node.get_ancestors()])
            path += "/" + self.name_in_url_form(self.heading_node)
            file_name = path + "/index.html"
        else:
            path = "/".join([self.name_in_url_form(node) for node in self.heading_node.get_ancestors()])
            file_name = path + "/" + self.name_in_url_form(self.heading_node) + ".html"
        try:
            os.makedirs(path)
        except os.error:
            pass
        with open(file_name, "w") as f:
            f.write(page)

    def get_title(self):
        ancestry = [i.name for i in self.heading_node.get_ancestors()]
        ancestry.reverse()
        return self.heading_node.name + " &lt; " + " &lt; ".join(ancestry)

    def get_toc(self):
        text = ""
        if self.heading_node.get_generation() < self.leaf_level:
            if self.heading_node.get_generation() < (self.leaf_level - 1):
                for child in self.heading_node.get_children():
                    text += "<p><a href=\"" + self.name_in_url_form(child) + "/index.html\">"
                    text += child.name + "</a></p> "
            else:
                for child in self.heading_node.get_children():
                    text += "<p><a href=\"" + self.name_in_url_form(child) + ".html\">"
                    text += child.name + "</a></p> "
        return text

    def get_menu(self):
        text = ""
        ancestry = self.heading_node.get_ancestors()
        ancestry = ancestry[1:]
        for ancestor in ancestry:
            level = ancestor.get_generation()
            if level < self.leaf_level:
                level = self.leaf_level - level
                text += "<p><a href=\"" + (level * "../") + self.name_in_url_form(ancestor) + "/index.html\">"
                text += ancestor.name + "</a></p>\n"
            else:
                text += "<p><a href=\"" + (level * "../") + self.name_in_url_form(ancestor) + ".html\">" + ancestor.name
                text += "</a></p>\n"
        level = self.heading_node.get_generation()
        try:
            left = self.heading_node.get_left_sister()
        except IndexError:
            left = None
        try:
            right = self.heading_node.get_right_sister()
        except IndexError:
            right = None
        if level < self.leaf_level:
            if left:
                text += "<p class=\"left\"><a href=\"../" + self.name_in_url_form(left) + "/index.html\">&#x2190; "
                text += left.name + "</a></p>"
            if right:
                text += "<p class=\"right\"><a href=\"../" + self.name_in_url_form(right) + "/index.html\">"
                text += right.name + " &#x2192;</a></p>"
        else:
            if left:
                text += "<p class=\"left\"><a href=\"" + self.name_in_url_form(left) + ".html\">&#x2190; "
                text += left.name + "</a><p>"
            if right:
                text += "<p class=\"right\"><a href=\"" + self.name_in_url_form(right) + ".html\">"
                text += right.name + " &#x2192;</a></p>"
        text += "<div style=\"clear: both;\"></div>"
        return text

    def get_stylesheet(self):
        generation = self.heading_node.get_generation()
        if generation < self.leaf_level:
            levels = generation + 1
        else:
            levels = generation
        line = "<link rel=\"stylesheet\" type=\"text/css\" href=\""
        line += levels * "../"
        line += self.stylesheet + "\">\n"
        return line

    def get_content(self):
        text = ""
        in_table = False
        in_list = False
        table = []
        u_list = []
        generation = self.heading_node.get_generation()
        for line in self.content:
            if in_table:
                if line[:4] != "[\\t]":
                    table.append(line)
                else:
                    text += self.make_table(table)
                    in_table = False
            elif in_list:
                if line[:4] not in ["[\\l]", "[\\n]"]:
                    u_list.append(line)
                else:
                    text += self.make_list(u_list, line[2])
                    in_list = False
            elif line[0] == "[":
                try:
                    heading = int(line[1])
                    text += self.change_to_heading(heading, generation, line[3:])
                except ValueError:
                    if line[:3] == "[t]":
                        in_table = True
                        table = [line[3:]]
                    elif line[:3] in ["[l]", "[n]"]:
                        in_list = True
                        u_list = [line[3:]]
                    else:
                        text += self.markup(line)
            else:
                text += "<p>" + line + "</p>\n"
        return text

    @staticmethod
    def change_to_heading(heading, generation, line):
        level = "h" + str(heading - generation + 1) + ">"
        text = "<" + level + line + "</" + level + "\n"
        return text

    @staticmethod
    def markup(line):
        category = line[1]
        line = line[3:]
        if category == "f":
            text = "<p class=\"example\">" + line + "</p>\n"
        elif category == "e":
            text = "<p class=\"example_no_lines\">" + line + "</p>\n"
        else:
            text = line + "\n"
        return text

    @staticmethod
    def name_in_url_form(node):
        name = node.name
        name = name.lower()
        name = name.replace(" ", "")
        name = name.replace("&#x294;", "''")
        name = name.replace("&#x2019;", "'")
        return name

    @staticmethod
    def make_table(table):
        text = "<table>\n<tr>\n"
        first_row = True
        for cell in table:
            if cell[:3] == "[r]":
                text += "</tr>\n<tr>\n<th>"
                text += cell[3:] + "</th>\n"
                first_row = False
            else:
                if not first_row:
                    text += "<td>" + cell + "</td>\n"
                else:
                    text += "<th>" + cell + "</th>\n"
        text += "</tr>\n</table>"
        return text

    @staticmethod
    def make_list(u_list, table_type):
        text = ""
        if table_type == "l":
            text = "<ul>\n"
            for item in u_list:
                text += "<li>" + item + "</li>\n"
            text += "</ul>\n"
        elif table_type == "n":
            text = "<ol>\n"
            for item in u_list:
                text += "<li>" + item + "</li>\n"
            text += "</ol>\n"
        else:
            raise ValueError('Invalid Table Type')
        return text

