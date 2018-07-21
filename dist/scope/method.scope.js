"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const monitor_scope_1 = require("./monitor.scope");
const function_scope_1 = require("./function.scope");
/**
 * A method level scope
 */
class MethodScope extends monitor_scope_1.MonitorScope {
    /**
     * Creates a new method scope
     * @param reference the function handle
     */
    constructor(reference) {
        if (!reference || typeof reference !== 'function') {
            throw new Error('MethodScope requires a valid function reference');
        }
        let name = reference.name;
        super(name, {
            type: 'method',
            reference
        });
    }
    /**
     * Creates a new child function scope within a method
     * @param reference the function reference
     */
    function(reference) {
        return this.derive(new function_scope_1.FunctionScope(reference));
    }
}
exports.MethodScope = MethodScope;
