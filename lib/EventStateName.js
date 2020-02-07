// eventName = stateName[Tag] : a.b.c[update]
class EventStateName {
    constructor(props = "") {
        props = props || "";
        this.name = props;
        const { stateName, tagName } = this._splitEventName(this.name);
        this.stateName = stateName;
        this.tagName = tagName;
        if (stateName) {
            this.stateNameArr = stateName.split(".");
            this.path = this.stateNameArr;
            this.firstStateName = this.stateNameArr[0];
            this.restStateName = this.stateNameArr.slice(1).join(".");
            this.restEventName = this.restStateName + (this.tagName || "");
            this.stateLevel = this.stateNameArr.length;
        }
    }
    _splitEventName(eventName) {
        const [tagName] = eventName.match(/\[.+\]/) || [null];
        const stateName = eventName.replace(/\[.+\]/, "");
        return { stateName, tagName };
    }
}

module.exports = EventStateName;
