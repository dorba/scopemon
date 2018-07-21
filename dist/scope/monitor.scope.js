"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const module_scope_1 = require("./module.scope");
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
    /**
     * Sets the parent of a scope to this scope
     * @param scope the child scope
     */
    derive(scope) {
        scope._parent = this;
        scope._root = this.root;
        return scope;
    }
    /**
     * Creates a new child module scope
     * @param path the module path
     */
    module(path) {
        return this.derive(new module_scope_1.ModuleScope(path));
    }
}
exports.MonitorScope = MonitorScope;
