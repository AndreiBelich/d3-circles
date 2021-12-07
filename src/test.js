var node = document.createElement('div');

var branches = [];
var seed = {i: 0, x: 420, y: 600, a: 0, l: 130, d:0}; // a = angle, l = length, d = depth
var da = 0.5; // Angle delta
var dl = 0.8; // Length delta (factor)
var ar = 0.65; // Randomness
var maxDepth = 8;


// Tree creation functions
function branch(b) {
  var end = endPt(b), daR, newB;

  branches.push(b);

  if (b.d === maxDepth)
    return;

  // Left branch
  daR = ar * Math.random() - ar * 0.5;
  newB = {
    i: branches.length,
    x: end.x,
    y: end.y,
    a: b.a - da + daR,
    l: b.l * dl,
    d: b.d + 1,
    parent: b.i
  };
  branch(newB);

  // Right branch
  daR = ar * Math.random() - ar * 0.5;
  newB = {
    i: branches.length,
    x: end.x, 
    y: end.y, 
    a: b.a + da + daR, 
    l: b.l * dl, 
    d: b.d + 1,
    parent: b.i
  };
  branch(newB);
}

function regenerate(initialise) {
  branches = [];
  branch(seed);
  initialise ? create() : update();
}

function endPt(b) {
  // Return endpoint of branch
  var x = b.x + b.l * Math.sin( b.a );
  var y = b.y - b.l * Math.cos( b.a );
  return {x: x, y: y};
}


// D3 functions
function x1(d) {return d.x;}
function y1(d) {return d.y;}
function x2(d) {return endPt(d).x;}
function y2(d) {return endPt(d).y;}
function highlightParents(d) {
  var colour = d3.event.type === 'mouseover' ? 'green' : '#777';
  var depth = d.d;
  for(var i = 0; i <= depth; i++) {
    d3.select('#id-'+parseInt(d.i)).style('stroke', colour);
    d = branches[d.parent];
  } 
}

function create() {
  d3.select(node).append('svg')
    .attr('height', 650)
    .attr('width', 960)
    .selectAll('line')
    .data(branches)
    .enter()
    .append('line')
    .attr('x1', x1)
    .attr('y1', y1)
    .attr('x2', x2)
    .attr('y2', y2)
    .style('stroke-width', function(d) {return parseInt(maxDepth + 1 - d.d) + 'px';})
    .attr('id', function(d) {return 'id-'+d.i;})
    .on('mouseover', highlightParents)
    .on('mouseout', highlightParents);
}

function update() {
  d3.select('svg')
    .selectAll('line')
    .data(branches)
    .transition()
    .attr('x1', x1)
    .attr('y1', y1)
    .attr('x2', x2)
    .attr('y2', y2);
}

regenerate(true);

d3.select(node).select('svg')
  .on('click', regenerate);

function createVoronoi() {
var voronoi = document.createElement('div');
  
var w = 960,
    h = 500;

var svg = d3.select(voronoi)
        .append("svg")
        .attr("width", w)
        .attr("height", h)
        .on('mount', function(){

          var w = 960,
              h = 500,
              radius = 5.25,
              links = [],
              simulate = true,
              zoomToAdd = true,
              // https://github.com/mbostock/d3/blob/master/lib/colorbrewer/colorbrewer.js#L105
              color = d3.scale.quantize().domain([10000, 7250]).range(["#dadaeb","#bcbddc","#9e9ac8","#807dba","#6a51a3","#54278f","#3f007d"])
          
          var numVertices = (w*h) / 3000;

          var vertices = d3.range(numVertices).map(function(i) {
              var angle = radius * (i+10);
              return {x: angle*Math.cos(angle)+(w/2), y: angle*Math.sin(angle)+(h/2)};
          });

          var d3_geom_voronoi = d3.geom.voronoi().x(function(d) { return d.x; }).y(function(d) { return d.y; })

          var prevEventScale = 1;

          var zoom = d3.behavior.zoom().on("zoom", function(d,i) {
              if (zoomToAdd){
                if (d3.event.scale > prevEventScale) {
                    var angle = radius * vertices.length;
                    vertices.push({x: angle*Math.cos(angle)+(w/2), y: angle*Math.sin(angle)+(h/2)})
                } else if (vertices.length > 2 && d3.event.scale != prevEventScale) {
                    vertices.pop();
                }
                force.nodes(vertices).start()
              } else {
                if (d3.event.scale > prevEventScale) {
                  radius+= .01
                } else {
                  radius -= .01
                }
                vertices.forEach(function(d, i) {
                  var angle = radius * (i+10);
                  vertices[i] = {x: angle*Math.cos(angle)+(w/2), y: angle*Math.sin(angle)+(h/2)};
                });
                force.nodes(vertices).start()
              }
              prevEventScale = d3.event.scale;
          });

          var svg = d3.select('svg')
            .call(zoom)      

          var force = d3.layout.force()
                  .charge(-300)
                  .size([w, h])
                  .on("tick", update);

          force.nodes(vertices).start();

          var circle = svg.selectAll("circle");
          var path = svg.selectAll("path");
          var link = svg.selectAll("line");

          function update(e) {
            console.lo
              path = path.data(d3_geom_voronoi(vertices))
              path.enter().append("path")
                  // drag node by dragging cell
                  .call(d3.behavior.drag()
                    .on("drag", function(d, i) {
                        vertices[i] = {x: vertices[i].x + d3.event.dx, y: vertices[i].y + d3.event.dy}
                    })
                  )
                  .style("fill", function(d, i) { return color(0) })
              path.attr("d", function(d) { return "M" + d.join("L") + "Z"; })
                  .transition().duration(150).style("fill", function(d, i) { return color(d3.geom.polygon(d).area()) })
              path.exit().remove();
              circle = circle.data(vertices)
              circle.enter().append("circle")
                    .attr("r", 0)
                    .transition().duration(1000).attr("r", 5);
              circle.attr("cx", function(d) { return d.x; })
                    .attr("cy", function(d) { return d.y; });
              circle.exit().transition().attr("r", 0).remove();
              link = link.data(d3_geom_voronoi.links(vertices))
              link.enter().append("line")
              link.attr("x1", function(d) { return d.source.x; })
                  .attr("y1", function(d) { return d.source.y; })
                  .attr("x2", function(d) { return d.target.x; })
                  .attr("y2", function(d) { return d.target.y; })
              link.exit().remove()
              if(!simulate) force.stop()
          }
        })

  return voronoi;
}

function createStreamGraph() {
  var streamGraph = document.createElement('div');

  var n = 20, // number of layers
      m = 200, // number of samples per layer
      stack = d3.layout.stack().offset("wiggle"),
      layers0 = stack(d3.range(n).map(function() { return bumpLayer(m); })),
      layers1 = stack(d3.range(n).map(function() { return bumpLayer(m); }));

  var width = 960,
      height = 500;

  var x = d3.scale.linear()
      .domain([0, m - 1])
      .range([0, width]);

  var y = d3.scale.linear()
      .domain([0, d3.max(layers0.concat(layers1), function(layer) { return d3.max(layer, function(d) { return d.y0 + d.y; }); })])
      .range([height, 0]);

  var color = d3.scale.linear()
      .range(["#aad", "#556"]);

  var area = d3.svg.area()
      .x(function(d) { return x(d.x); })
      .y0(function(d) { return y(d.y0); })
      .y1(function(d) { return y(d.y0 + d.y); });

  var svg = d3.select(streamGraph).append("svg")
      .attr("width", width)
      .attr("height", height);

  svg.selectAll("path")
      .data(layers0)
    .enter().append("path")
      .attr("d", area)
      .style("fill", function() { return color(Math.random()); });

  // On load function that will trigger the transitions
  svg.on('mount', function() {
    transition();
  });

  // This function will be triggered on load
  function transition() {

    d3.selectAll("path")
        .data(function() {
          var d = layers1;
          layers1 = layers0;
          return layers0 = d;
        })
      .transition()
        .duration(2500)
        .attr("d", area);

  }

  function bumpLayer(n) {

    function bump(a) {
      var x = 1 / (.1 + Math.random()),
          y = 2 * Math.random() - .5,
          z = 10 / (.1 + Math.random());
      for (var i = 0; i < n; i++) {
        var w = (i / n - y) * z;
        a[i] += x * Math.exp(-w * w);
      }
    }

    var a = [], i;
    for (i = 0; i < n; ++i) a[i] = 0;
    for (i = 0; i < 5; ++i) bump(a);
    return a.map(function(d, i) { return {x: i, y: Math.max(0, d)}; });
  }

 return streamGraph;
}

var { Router, Route, IndexRoute, Link, browserHistory } = ReactRouter

var MainLayout = React.createClass({
  render: function() {
    return (
      <div className="app">
        <header className="primary-header"></header>
        <aside className="primary-aside">
          <ul>
            <li><Link to="/">BinaryTree</Link></li>
            <li><Link to="/voronoi">Voronoi</Link></li>
            <li><Link to="/streamgraph">Stream Graph</Link></li>
          </ul>
        </aside>
        <main>
          {this.props.children}
        </main>
      </div>
      )
  }
})

var BinaryTree = React.createClass({
  getInitialState: function() {
    return {d3: ''}
  },

  componentDidMount: function() {
    this.setState({d3: node});
  },

  render: function() {
    var RD3Component = rd3.Component;
    return (
      <div>
        <RD3Component data={this.state.d3} />
      </div>
    )
  }
})

var Voronoi = React.createClass({
  getInitialState: function() {
    return {d3: ''}
  },

  componentDidMount: function() {
    this.setState({d3: createVoronoi()});
  },

  render: function() {
    var RD3Component = rd3.Component;
    return (
      <div>
        <RD3Component data={this.state.d3} />
      </div>
    )
  }
})

var StreamGraph = React.createClass({
  getInitialState: function() {
    return {d3: ''}
  },

  componentDidMount: function() {
    this.setState({d3: createStreamGraph()});
  },

  render: function() {
    var RD3Component = rd3.Component;
    return (
      <div>
        <RD3Component data={this.state.d3} />
      </div>
    )
  }
})

// Note that with how CodePen works, I wasn't able to get the browserHistory to work
// as the article suggests. The demo works without it, but you'll want to be sure to 
// use it in a real application
ReactDOM.render((
  <Router>
    <Route path="/" component={MainLayout}>
      <IndexRoute component={BinaryTree} />
      <Route path="voronoi" component={Voronoi} />
      <Route path="streamgraph" component={StreamGraph} />
    </Route>
  </Router>
), document.getElementById('root'))


