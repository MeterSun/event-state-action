const EventStateName = require("./lib/EventStateName");
const ObjTree = require("./lib/ObjTree");
const State = require("./lib/State");
const PathCompare = require("./lib/PathCompare");

class ESA {
    constructor(props) {
        this.root = new ObjTree();
        this.publishList = [];
        this.isRunningSubscribeAction = false;
    }
    init(stateName, initialstate = undefined) {
        const name = new EventStateName(stateName);
        const newNode = new State(initialstate)
        const withTag = (...tags) => newNode.addTag(...tags);
        this.root.addChild(name.stateName, newNode);
        return { withTag };
    }
    _publish(eventName, param) {
        const name = new EventStateName(eventName);
        const esa = this;
        this.root.recursionChildFirst(function () {
            if (PathCompare.equal(this.path, name.path)) {
                this.root.exec(name.tagName, param);
                esa.isRunningSubscribeAction = false;
            }
            if (PathCompare.ArootBchild(this.path, name.path)) {
                this.root.exec('[@child]');
            }
            esa.runPublishList();
        });
    }
    publish(eventName, param) {
        const name = new EventStateName(eventName);
        if (name.stateName && !this.root.findChildNode(name.stateName)) throw new Error(`State '${name.stateName}' is not initialized`);
        this.publishList.push(() => this._publish(eventName, param));
        if (!this.isRunningSubscribeAction) this.runPublishList();
    }
    runPublishList() {
        if (this.publishList.length > 0 && !this.isRunningSubscribeAction) {
            let [fun] = this.publishList.splice(0, 1);
            this.isRunningSubscribeAction = true;
            fun()
        }
    }
    subscribe(eventName, callback) {
        const name = new EventStateName(eventName);
        let removehandle;
        if (name.stateName && !this.root.findChildNode(name.stateName)) throw new Error(`State '${name.stateName}' is not initialized`);
        this.root.recursionChildFirst(function () {
            if (PathCompare.equal(this.path, name.path)) {
                removehandle = this.root.addAction(name.tagName, callback);
            }
        });
        return removehandle;
    }
    get(stateName) {
        let result;
        this.root.recursionRootFirst(function () {
            if (stateName === this.path.join(".")) result = this.root.valueOf();
        });
        return result;
    }
    /**
     * alias name of publish
     */
    pub(...params) {
        this.publish(...params)
    }
    /**
     * alias name of subscribe
     */
    sub(...params) {
        this.subscribe(...params)
    }
}

module.exports = new ESA();
