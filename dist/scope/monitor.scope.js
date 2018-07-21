"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The execution scope of the monitor
 */
class MonitorScope {
    /**
     * Creates a new scope
     * @param name the name of the scope
     * @param context optional context for the scope
     */
    constructor(name, context) {
        this._name = name;
        this._context = context || null;
    }
    /** Gets the name of the scope */
    get name() {
        return this._name;
    }
    /** Gets the scope context */
    get context() {
        return this._context;
    }
    /** Gets the parent scope */
    get parent() {
        return this._parent;
    }
    /** Gets the root scope */
    get root() {
        if (!this._root) {
            let root = this;
            while (root.parent) {
                root = root.parent;
            }
            this._root = root;
        }
        return this._root;
    }
    /** Gets the full module path */
    get path() {
        if (!this._path) {
            let names = [this.name];
            let parent = this.parent;
            while (parent) {
                names.unshift(parent.name);
                parent = parent.parent;
            }
            this._path = names.join('/');
        }
        return this._path;
    }
    /**
     * Sets the parent of a scope to this scope
     * @param scope the child scope
     */
    derive(scope) {
        scope._parent = this;
        scope._root = this.root;
        return scope;
    }
}
exports.MonitorScope = MonitorScope;
