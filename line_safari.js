var assert  = require('assert');

function line(grid) {
  let ends = findEnds(grid);
  if (findPath(ends[0], grid) || findPath(ends[1], grid)) {
    return true;
  } else {
    return false;
  }
}

function findEnds(grid) {
  let ends = [], regex1 = RegExp(/X/g), match;
  for (let i = 0 ; i < grid.length; i++) {
    while ((match = regex1.exec(grid[i])) !== null) {
      ends.push([regex1.lastIndex - 1, i])
    }
  }
  return ends;
}

function findPath(start, grid) {
  let path = [start], node = checkNextNode(start, grid, []);
  while (node.length == 1 && (path.length == 1 || grid[path.slice(-1)[0][1]][path.slice(-1)[0][0]] != 'X')) {
    path.push(node[0]);
    node = checkNextNode(node[0], grid, [path.slice(-2, -1)[0][0], path.slice(-2, -1)[0][1]]);
    path.forEach(loc => {node.forEach((n, idx) => {
      if (n[0] == loc[0] && n[1] == loc[1]) {node.splice(idx, 1)};
    })});
  }
  if (grid[path.slice(-1)[0][1]][path.slice(-1)[0][0]] == 'X' &&
      path.length > 1 &&
      grid.join("").replace(/\s/g, '').length == path.length) {
        return true;
  } else {
        return false;
  }
}

function checkNextNode(current, grid, previous) {
  let nextNode = [];
  let curSymbol = grid[current[1]][current[0]];
  if (curSymbol == 'X' ||
      curSymbol == '|' ||
     (curSymbol == '+' && previous.length && previous[1] == current[1])
      ) {
    //check above and below
    if (checkCell([current[0], current[1] - 1], grid, previous, ['|', '+', 'X'])) {
      nextNode.push([current[0], current[1] - 1]);
    }
    if (checkCell([current[0], current[1] + 1], grid, previous, ['|', '+', 'X'])) {
      nextNode.push([current[0], current[1] + 1]);
    }
  }
  if (curSymbol == 'X' ||
      curSymbol == '-' ||
     (curSymbol == '+' && previous.length && previous[0] == current[0])
      ) {
    //check left and right
    if (checkCell([current[0] - 1, current[1]], grid, previous, ['-', '+', 'X'])) {
      nextNode.push([current[0] - 1, current[1]]);
    }
    if (checkCell([current[0] + 1, current[1]], grid, previous, ['-', '+', 'X'])) {
      nextNode.push([current[0] + 1, current[1]]);
    }
  }
  return nextNode;
}

function checkCell(cell, grid, previous, symbols) {
  return (grid[cell[1]] &&
    symbols.some(symbol => symbol == grid[cell[1]][cell[0]]))
}

//Tests
testGrid1 = ['X-----X']
assert.deepEqual(findEnds(testGrid1), [[0,0], [6,0]]);
assert.deepEqual(checkNextNode([0,0], testGrid1, []), [[1,0]])
assert.deepEqual(checkNextNode([1,0], testGrid1, [0,0]), [[0,0],[2,0]])
assert.deepEqual(checkNextNode([6,0], testGrid1, []), [[5,0]])

var grid1 = ([
"           ",
"X---------X",
"           ",
"           "
]);
assert.equal(line(grid1), true);

var grid2 = ([
"                    ",
"     +--------+     ",
"  X--+        +--+  ",
"                 |  ",
"                 X  ",
"                    "
]);
assert.equal(line(grid2), true);

var grid3 = ([
"     ",
"  X  ",
"  |  ",
"  |  ",
"  X  "
]);
assert.equal(line(grid3), true);

var grid5 = ([
"                     ",
"    +-------------+  ",
"    |             |  ",
" X--+      X------+  ",
"                     "
]);
assert.equal(line(grid5), true);

var grid6 = ([
"                      ",
"   +-------+          ",
"   |      +++---+     ",
"X--+      +-+   X      "
]);
assert.equal(line(grid6), true);

var grid7 = ([
"X-----|----X"
]);
assert.equal(line(grid7), false);

var grid8 = ([
" X  ",
" |  ",
" +  ",
" X  "
]);
assert.equal(line(grid8), false);

var grid9 = ([
"   |--------+    ",
"X---        ---+ ",
"               | ",
"               X "
]);
assert.equal(line(grid9), false);

var grid10 = ([
"              ",
"   +------    ",
"   |          ",
"X--+      X   ",
"              "
]);
assert.equal(line(grid10), false);

var grid11 = ([
"      +------+",
"      |      |",
"X-----+------+",
"      |       ",
"      X       ",
]);
assert.equal(line(grid11), false);

var grid12 = ([
  '            ',
  '   X+++     ',
  '    +++X    '
]);
assert.equal(line(grid12), true);
