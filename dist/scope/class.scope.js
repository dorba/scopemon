"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const monitor_scope_1 = require("./monitor.scope");
const method_scope_1 = require("./method.scope");
/**
 * A class level scope
 */
class ClassScope extends monitor_scope_1.MonitorScope {
    /**
     * Creates a new class scope
     * @param instance the class instance
     */
    constructor(instance) {
        if (!instance || !instance.constructor) {
            throw new Error('ClassScope requires a valid class instance');
        }
        let name = instance.constructor.name;
        super(name, {
            name, instance
        });
    }
    /**
     * Creates a new child method scope
     * @param reference the method reference
     */
    method(reference) {
        return this.derive(new method_scope_1.MethodScope(this.context.instance, reference));
    }
}
exports.ClassScope = ClassScope;
