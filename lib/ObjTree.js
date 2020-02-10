const EventStateName = require("./EventStateName");

class ObjTree {
    constructor(TreeNode, { name, path } = {}) {
        this.name = name; // current name
        this.path = path; // Array of name from root to child // statename = path.join('.')
        this.pathName = path && path.join('.');
        this.root = TreeNode;
        this.children = {};
    }
    addChild(stateName, TreeNode) {
        const name = new EventStateName(stateName);
        if (name.stateLevel == 1) {
            if (this.children.hasOwnProperty(name.firstStateName)) {
                this.children[name.firstStateName].root = TreeNode;
            } else {
                this.children[name.firstStateName] = new ObjTree(TreeNode, {
                    name: name.firstStateName,
                    path: [].concat(this.path || []).concat([name.firstStateName]),
                });
            }
        } else {
            if (this.children.hasOwnProperty(name.firstStateName)) {
                this.children[name.firstStateName].addChild(name.restStateName, TreeNode);
            } else {
                this.children[name.firstStateName] = new ObjTree(null, {
                    name: name.firstStateName,
                    path: [].concat(this.path || []).concat([name.firstStateName]),
                });
                this.children[name.firstStateName].addChild(name.restStateName, TreeNode);
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
    findChildNode(stateName) {
        let child;
        this.recursionRootFirst(function (tree) {
            if (this.pathName === stateName)
                child = this.root;
        })
        return child;
    }
    recursionRootFirst(callback) {
        if (this.root) {
            callback.call(this, this.root);
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
            callback.call(this, this.root);
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
