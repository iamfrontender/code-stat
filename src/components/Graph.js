import ModuleInfo from './ModuleInfo';
import ModulesGraph from '../models/ModulesGraph';

d3.selection.prototype.moveToFront = function() {
    return this.each(function(){
        this.parentNode.appendChild(this);
    });
};

class Graph {
    constructor() {
        this.elements();
        this.components();
        this.listeners();
    }

    elements() {
        this.svg = d3.select('body').append('svg');
        this.resize();

        this.container = this.svg.append('g');
    }

    components() {
        this.color = d3.scale.category20();
        this.force = d3.layout.force()
            .charge(-500)
            .linkDistance(100)
            .linkStrength(.05)
            .size([this.width, this.height]);

        this.zoom = d3.behavior.zoom()
            .size(this.width, this.height)
            .scaleExtent([.5, 1.5]);

        this.drag = this.force.drag()
            .origin(function(d) { return d; });

        this.svg.call(this.zoom);
    }

    listeners() {
        window.addEventListener('resize', this.resize.bind(this));

        this.zoom.on('zoom', this._zoom.bind(this));

        this.drag.on('dragstart', this._dragstart)
            .on('drag', this._drag)
            .on('dragend', this._dragend)

        this.force.on('tick', function() {
            this.link.attr('x1', function(d) { return d.source.x; })
                .attr('y1', function(d) { return d.source.y; })
                .attr('x2', function(d) { return d.target.x; })
                .attr('y2', function(d) { return d.target.y; });

            this.node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
        }.bind(this));
    }

    start(done) {
        d3.json('modules.json', function(err, modules) {
            if (err) {
                throw error;
            }

            this.load(modules);
            done();
        }.bind(this));
    }

    load(modules) {
        this.graph = new ModulesGraph(modules);

        this.force.nodes(this.graph.nodes)
            .links(this.graph.links)
            .start();

        this.links();
        this.nodes();
    }

    links() {
        this.link = this.container.selectAll('.link')
            .data(this.graph.links)
            .enter().append('line')
            .attr('class', 'link')
            .attr('data-index', function(d) {
                return d.source.index + '-' + d.target.index;
            })
            .style('stroke-width', function(d) {
                return Math.sqrt(d.value);
            });
    }

    nodes() {
        this.node = this.container.selectAll('.node')
            .data(this.graph.nodes)
            .enter().append('g')
            .attr('class', 'node')
            .on('mouseover', this.highlight.bind(this))
            .on('mouseleave', this.unhighlight.bind(this))
            .on('click', this.select.bind(this))
            .attr('data-index', d => d.index)
            .call(this.drag);

        this.node.append('circle')
            .attr('r', 5)
            .style('fill', d => this.color(d.group));

        this.node.append("text")
            .attr("x", 12)
            .attr("dy", ".35em")
            .text(d => d.name);
    }

    highlight(node) {
        this.link.classed('muted', true);
        this.node.classed('muted', true);

        var nodeEl = d3.select('.node[data-index="' + node.index + '"]');
        var links = this.graph.getNodeLinks(node).map(function(target) {
            d3.select('.node[data-index="' + target + '"]').classed('muted', false);
            return d3.select('.link[data-index="' + node.index + '-' + target + '"]');
        });

        nodeEl
            .classed('active', true)
            .classed('muted', false)
            .moveToFront()
          .select('circle')
            .transition()
            .duration(200)
            .attr('r', 8);

        links.forEach(function(link) {
            link
                .classed('active', true)
                .classed('muted', false)

        });
    }

    unhighlight(node) {
        this.link.classed('muted', false);
        this.node.classed('muted', false);

        d3.select('.node[data-index="' + node.index + '"] circle')
            .transition()
            .duration(200)
            .attr('r', 5);

        d3.selectAll('.active')
            .classed('active', false);
    }

    select(node) {
        ModuleInfo.module = this.graph.getModule(node.name);
        ModuleInfo.show();
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
    }
    
    _zoom() {
        this.container.attr('transform', 'translate(' + d3.event.translate + ')' + ' scale(' + d3.event.scale + ')')
    }

    _dragstart() {
        d3.event.sourceEvent.stopPropagation();
        d3.select(this).classed("dragging", true);
    }

    _drag(d) {
        d3.select(this).attr("transform", function(d) {
            return "translate(" + (d.x = d3.event.x) + "," + (d.y = d3.event.y) + ")";
        });
    }

    _dragend() {
        d3.select(this).classed("dragging", false);
    }

    get width() {
        return this.svg.attr('width');
    }

    set width(value) {
        this.svg.attr('width', value);
    }

    get height() {
        return this.svg.attr('height');
    }

    set height(value) {
        this.svg.attr('height', value);
    }
}

export default new Graph();