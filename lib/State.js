const ActionSet = require("./ActionSet");

class State {
    constructor(initialState) {
        this.data = initialState;
        this.actionSet = new ActionSet();
        this.addTag("[@child][#all]");
    }
    addAction(...params) {
        this.actionSet.addAction(...params);
    }
    addTag(...params) {
        params = params.join("").split(/\]|\[/).filter(v => v).map(v => `[${v}]`);
        for (const tagName of params) {
            this.actionSet.addTag(tagName);
        }
    }
    exec(tagName, param) {
        let actions = this.actionSet.getAction(tagName);
        this._setNewData(param);
        actions.map(action => {
            action(this.data, (tagName, param) => {
                // subscribe next
                this.exec(tagName, param);
            });
        });
        tagName !== "[#all]" && this.exec("[#all]");
    }
    _setNewData(param) {
        if (typeof param === "function")
            param = param(this.data, (tagName, param) => {
                // publish next
                this.exec(tagName, param);
            });
        if (typeof param === "undefined") param = this.data;
        this.data = param;
    }
    valueOf() {
        return this.data;
    }
}
/**
const s = new State(true);
s.addTag("[on]");
s.addAction("[on]", state => console.log("[got on]", state));
s.addAction(state => console.log("[got default]", state));
s.exec("[on]");
s.exec(""); // exec default action
s.exec(); // exec default action
s.exec("[on]", true);
s.exec(null, s => !s); // exec default action
/**/

module.exports = State;
