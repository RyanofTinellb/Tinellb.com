class Hierarchy:
    def __init__(self, name):
        self.root = Node(name)
        self.nodes = []
        self.node_index = -1

    def add_node(self, parent, name):
        if name not in parent.get_children_names():
            child = Node(name, parent)
            parent.children.append(child)
            self.nodes.append(child)
            return child

    def delete_node(self, node):
        node.parent.children.remove(node)
        self.nodes.remove(node)

    def get_next_node(self):
        self.node_index += 1
        if self.node_index <= len(self.nodes):
            return self.nodes[self.node_index]

    def get_node_names(self, name=""):
        node = self.get_node_names_iter(self.root, name)
        return node

    def get_node_names_iter(self, node, name):
        if node.name == name:
            return node
        else:
            for child in node.children:
                if child.name == name:
                    return child
                else:
                    node = self.get_node_names_iter(child, name)
                    if node:
                        return node

    @staticmethod
    def get_sister(node, index):
        children = node.parent.children
        node_order = children.index(node)
        if len(children) > node_order + index >= 0:
            return children[node_order + index]
        else:
            return None

    def get_left_sister(self, node):
        return self.get_sister(node, -1)

    def get_right_sister(self, node):
        return self.get_sister(node, 1)


class Node:
    def __init__(self, name, parent=None):
        self.parent = parent
        self.name = self.text_replace(name)
        self.children = []

    def get_name(self):
        return self.name

    def get_children(self):
        return self.children

    def get_children_names(self):
        return [child.name for child in self.children]

    def get_parent(self):
        return self.parent

    def has_children(self):
        return len(self.children) > 0

    def get_ancestors(self):
        node = self
        ancestry = []
        while node.parent is not None:
            node = node.parent
            ancestry.insert(0, node)
        return ancestry

    # @return: how deep in the tree the particular node is
    def get_generation(self):
        return len(self.get_ancestors())

    @staticmethod
    def text_replace(text):
        text = text.replace("&#x294;", "''")
        text = text.replace("&#x2019;", "'")
        if "&" in text:
            raise IndexError('Replacement not yet complete in ' + text + ".")
        return text
