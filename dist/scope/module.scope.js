"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const monitor_scope_1 = require("./monitor.scope");
const class_scope_1 = require("./class.scope");
const function_scope_1 = require("./function.scope");
/**
 * A module level scope
 */
class ModuleScope extends monitor_scope_1.MonitorScope {
    /**
     * Creates a new module scope
     * @param path the module path
     */
    constructor(path) {
        if (!path) {
            throw new Error('ModuleScope requires a path');
        }
        if (path[0] === '.') {
            throw new Error('ModuleScope requires absolute paths');
        }
        if (!path.toLowerCase().endsWith('.js')) {
            throw new Error('ModuleScope requires a fully qualified file path');
        }
        let name = path.split('/').pop();
        name = name.substr(0, name.length - 3);
        super(name, {
            name, path
        });
    }
    /**
     * Creates a new child class scope
     * @param instance the class instance
     */
    class(instance) {
        return this.derive(new class_scope_1.ClassScope(instance));
    }
    /**
     * Creates a new child function scope with a module
     * @param reference the function handle
     */
    function(reference) {
        return this.derive(new function_scope_1.FunctionScope(reference));
    }
}
exports.ModuleScope = ModuleScope;
