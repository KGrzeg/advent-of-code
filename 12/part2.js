const fs = require("fs");

const text = fs.readFileSync(process.stdin.fd, "utf8");
const lines = text.split("\n").filter(a => a);

const BIG = 1;
const SMOL = 0;

const g_nodes = [];
const g_connections = [];
let start_node, end_node;
let paths = 0;

class Node {
  constructor(name) {
    this.name = name;
    this.size = SMOL;
    this.connections = [];

    if (name == "start") start_node = this;
    if (name == "end") end_node = this;

    if (name[0] == name.toUpperCase()[0]) this.size = BIG;
  }

  addConnection(node) {
    if (this.connections.find(n => n.name == node.name) !== undefined)
      return;

    this.connections.push(node);
    node.connections.push(this);
  }

  static newNode(name) {
    if (g_nodes[name]) return g_nodes[name];

    const n = new Node(name);
    g_nodes[name] = n;

    return n;
  }

  toString() {
    return `${this.name}: ${this.connections.map(n => n.name).join(", ")}`;
  }
}

(function readConnections() {
  lines.forEach(line => {
    const [a, b] = line.split('-');
    g_connections.push(
      [Node.newNode(a), Node.newNode(b)]
    );
  })
})();

(function buildGraph() {
  g_connections.forEach(([a, b]) => {
    a.addConnection(b)
  });
})();

(function bfs() {
  function strive(node, visited = { twice: false }, last = false) {
    if (node.name == end_node.name) {
      paths++;
      return;
    }

    //meet start again
    if (node.name == start_node.name && last) {
      return;
    }

    //naive check, should check for cycles, not indirect connetions!
    if (last && node.name == last.name) {
      return;
    }

    if (node.size == SMOL && visited[node.name]) {
      if (visited.twice) return;

      visited.twice = true;
    }

    visited[node.name] = 1;

    node.connections.forEach(n => {
      strive(n, Object.assign({}, visited), node);
    });
  }

  strive(start_node);
})();

console.log(`Found ${paths} paths`);
