const EventStateName = require("./lib/EventStateName");
const ObjTree = require("./lib/ObjTree");
const State = require("./lib/State");
const PathCompare = require("./lib/PathCompare");

class ESA {
    constructor(props) {
        this.root = new ObjTree();
    }
    init(stateName, initialstate) {
        const name = new EventStateName(stateName);
        this.root.addChild(name.stateName, new State(initialstate));
    }
    publish(eventName, param) {
        const name = new EventStateName(eventName);
        this.root.recursionChildFirst(function () {
            if (PathCompare.equal(this.path, name.path)) {
                this.root.exec(name.tagName, param);
            // } else if (PathCompare.ArootBchild(this.path, name.path)) {
            //     this.root.exec(param);
            }
        });
    }
    subscribe(eventName, callback) {
        const name = new EventStateName(eventName);
        this.root.recursionChildFirst(function () {
            if (PathCompare.equal(this.path, name.path)) { 
                this.root.addAction(name.tagName,callback);
            }
        });
    }
    get(stateName) {
        let result;
        this.root.recursionRootFirst(function () {
            if (stateName === this.path.join(".")) result = this.root.valueOf();
        });
        return result;
    }
}

module.exports = new ESA();
