"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const monitor_scope_1 = require("./monitor.scope");
/**
 * A function level scope
 */
class FunctionScope extends monitor_scope_1.MonitorScope {
    /**
     * Creates a new function scope
     * @param reference the function handle
     */
    constructor(reference) {
        if (!reference || typeof reference !== 'function') {
            throw new Error('FunctionScope requires a valid function reference');
        }
        let name = reference.name || 'anonymous';
        super(name, {
            name, reference
        });
    }
    /**
     * Creates a new child function scope within a function
     * @param reference the function reference
     */
    function(reference) {
        return this.derive(new FunctionScope(reference));
    }
}
exports.FunctionScope = FunctionScope;
