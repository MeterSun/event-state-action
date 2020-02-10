class ActionSet {
    constructor(...tags) {
        this.defaultActions = [];
        this.tagActions = {};
        for (const tagName of tags) {
            this.addTag(tagName);
        }
    }
    isTagExist(tagName) {
        return this.tagActions.hasOwnProperty(tagName);
    }
    addTag(tagName) {
        if (!this.isTagExist(tagName)) {
            this.tagActions[tagName] = [];
        }
    }
    addDefalutAction(action) {
        this.defaultActions.push(action);
        return () => this.defaultActions.splice(this.defaultActions.indexOf(action), 1);
    }
    addTagAction(tagName, action) {
        if (this.isTagExist(tagName)) {
            this.tagActions[tagName].push(action);
        } else {
            throw new Error(`tagName '${tagName}' is not exist`);
        }
        return () => this.tagActions[tagName].splice(this.tagActions[tagName].indexOf(action), 1);
    }
    addAction(tagName, action) {
        if (typeof tagName === 'function' && action === undefined) {
            action = tagName;
            return this.addDefalutAction(action);
        } else if (!tagName && typeof action === "function") {
            return this.addDefalutAction(action);
        } else {
            return this.addTagAction(tagName, action);
        }
    }
    getDefalutAction() {
        return this.defaultActions;
    }
    getTagAction(tagName) {
        if (this.isTagExist(tagName)) {
            return this.tagActions[tagName];
        }
        throw new Error(`tagName '${tagName}' is not exist`);
    }
    getAction(tagName) {
        if (tagName) {
            return this.getTagAction(tagName);
        } else {
            return this.getDefalutAction();
        }
    }
}

module.exports = ActionSet;
