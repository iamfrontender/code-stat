class ModulesGraph {
    constructor(modules) {
        this.modules = modules;

        this.nodes = [];
        this.links = [];

        this._nodeMap = {};
        this._linkMap = {};

        this.parse();
    }

    parse() {
        this.modules.forEach(this.extractNode, this);
        this.modules.forEach(this.extractLink, this);
    }

    extractNode(module, index) {
        if (!this.hasNode(module.name)) {
            index = index || this.nodes.length;

            this._nodeMap[module.name] = index;
            this.nodes.push({
                name: module.name,
                group: this._getGroup(module.name)
            });
        }
    }

    extractLink(module) {
        if (module.dependencies.length > 0) {
            module.dependencies.forEach(function (dep) {
                // TODO: Move #resolve to Module model
                var relativeLocation = this._getGroup(module.name);

                if (this._isRelative(dep)) {
                    dep = relativeLocation + dep.replace('.', '');
                }

                var source = this._nodeMap[module.name];
                var target = this._nodeMap[dep] || 0;

                this._linkMap[source] = this._linkMap[source] || [];
                this._linkMap[source].push(target);

                this.links.push({
                    source: this._nodeMap[module.name],
                    target: this._nodeMap[dep] || 0,
                    value: 2
                })
            }, this);
        }
    }

    _getGroup(name) {
        return name.split('/').slice(0, -1).join('/');
    }

    _isRelative(dep) {
        return dep.startsWith('./');
    }

    hasNode(name) {
        return typeof this._nodeMap[name] === 'number';
    }

    getModule(name) {
        return this.modules[this._nodeMap[name]];
    }

    getNodeLinks(node) {
        return this._linkMap[node.index];
    }
}

export default ModulesGraph;