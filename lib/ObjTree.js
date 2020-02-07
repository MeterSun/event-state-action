const EventStateName = require("./EventStateName");

class ObjTree {
    constructor(props, { name, path } = {}) {
        this.name = name;
        this.path = path;
        this.root = this.initRoot(props);
        this.children = {};
    }
    initRoot(props) {
        return props;
    }
    addChild(stateName, initialstate) {
        const name = new EventStateName(stateName);
        if (name.stateLevel == 1) {
            if (this.children.hasOwnProperty(name.firstStateName)) {
                this.children[name.firstStateName].root = this.initRoot(initialstate);
            } else {
                this.children[name.firstStateName] = new ObjTree(initialstate, {
                    name: name.firstStateName,
                    path: [].concat(this.path || []).concat([name.firstStateName]),
                });
            }
        } else {
            if (this.children.hasOwnProperty(name.firstStateName)) {
                this.children[name.firstStateName].addChild(name.restStateName, initialstate);
            } else {
                this.children[name.firstStateName] = new ObjTree(null, {
                    name: name.firstStateName,
                    path: [].concat(this.path || []).concat([name.firstStateName]),
                });
                this.children[name.firstStateName].addChild(name.restStateName, initialstate);
            }
        }
    }
    removeChild(stateName) {
        const name = new EventStateName(stateName);
        if (name.stateLevel == 1) {
            if (this.children.hasOwnProperty(name.firstStateName)) {
                if (Object.keys(this.children[name.firstStateName].children).length) {
                    this.children[name.firstStateName].root = undefined;
                } else {
                    delete this.children[name.firstStateName];
                }
            }
        } else {
            if (this.children.hasOwnProperty(name.firstStateName)) {
                this.children[name.firstStateName].removeChild(name.restStateName);
            }
        }
    }
    recursionRootFirst(callback) {
        if (this.root) {
            callback.apply(this);
        }
        for (const key in this.children) {
            if (this.children.hasOwnProperty(key)) {
                const statetree = this.children[key];
                statetree.recursionRootFirst(callback);
            }
        }
    }
    recursionChildFirst(callback) {
        for (const key in this.children) {
            if (this.children.hasOwnProperty(key)) {
                const statetree = this.children[key];
                statetree.recursionChildFirst(callback);
            }
        }
        if (this.root) {
            callback.apply(this);
        }
    }
    log() {
        this.recursionRootFirst(function () {
            console.log(this.path.join("."));
        });
    }
}
/**
const b = new ObjTree();
b.addChild('haha.aa', 1);
b.addChild('haha', 2);
b.addChild('www.bb.cc', 3);
b.addChild('www.bb', 4);
b.log();
b.removeChild('haha');
b.removeChild('www.bb');
b.log();
b.recursionChildFirst(function () {
    console.log(this.path.join('.'), this.root);
})
*/

module.exports = ObjTree;
