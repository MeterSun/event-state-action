const EventStateName = require("./EventStateName");

class State {
    constructor(props) {
        this.data = props;
        this.actions = {
            default: [],
            tag: {},
        };
    }
    addAction(tag, action) {
        if (typeof tag === "function") {
            // add default action
            this.actions.default.push(tag);
        } else {
            const { tagName } = new EventStateName(tag);
            if (tagName) {
                // add tag action
                this.actions.tag[tag] = (this.actions.tag[tag] || []).concat(action);
            } else {
                this.actions.default.push(action);
            }
        }
    }
    exec(eventName = "", param) {
        if (typeof eventName === "function") {
            param = eventName;
            eventName = "";
        }
        const { stateName, tagName } = new EventStateName(eventName);
        this._computNewData(param);
        if (this.actions.tag.hasOwnProperty(tagName)) {
            this.actions.tag[tagName].map(action => this._execAction(action));
        } else {
            this.actions.default.map(action => this._execAction(action));
        }
        this._setDataOnEvent();
    }
    _computNewData(param) {
        this.oldData = this.data;
        switch (typeof param) {
            case "function":
                this.newData = param(this.data);
                break;
            case "undefined":
                this.newData = this.data;
                break;
            default:
                this.newData = param;
                break;
        }
    }
    _setDataOnEvent() {
        this.data = this.newData;
    }
    _execAction(action) {
        action(this.oldData, this.newData);
    }
    valueOf() {
        return this.data;
    }
}
/** 
 const s = new State(true);
 s.addAction("[on]", (prevState, nextState) => console.log("[got on]", prevState, nextState));
 s.addAction((prevState, nextState) => console.log("[got default]", prevState, nextState));
 s.exec("[on]");
 s.exec("");
 s.exec();
 s.exec("[on]", true);
 s.exec("", s => !s);
 s.exec(s => !s);
 // console.log(s);
*/

module.exports = State;
