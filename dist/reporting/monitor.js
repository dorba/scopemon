"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Scope = require("../scope");
/**
 * A monitor which may report on events within a scope
 */
class Monitor {
    /**
     * Creates a new monitor
     * @param name the monitor name
     */
    constructor(from, directors) {
        if (!from) {
            this._scope = new Scope.MonitorScope('root', null);
        }
        else if (typeof from === 'string') {
            this._scope = new Scope.MonitorScope(from, null);
        }
        else {
            this._scope = from;
        }
        this._directors = directors || [];
    }
    /**
     * Reports new information
     * @param topic the topic to report on
     * @param info information about the topic
     */
    report(topic, info) {
        for (let dir of this._directors) {
            if (dir.accept.includes(topic)) {
                dir.receive(topic, info, this._scope);
            }
        }
    }
    /**
     * Creates a new monitor within the specified scope
     * @param context the context to scope to
     */
    scopeTo(context) {
        if (!context) {
            return this;
        }
        let scope = this._scope;
        let childScope;
        if (this.isModule(context)) {
            childScope = scope.derive(new Scope.ModuleScope(context));
        }
        else if (this.isClass(context) && 'class' in scope) {
            childScope = scope.class(context);
        }
        else if (this.isMethod(context) && 'method' in scope) {
            childScope = scope.method(context);
        }
        else if (this.isFunction(context) && 'function' in scope) {
            childScope = scope.function(context);
        }
        if (!childScope) {
            throw new Error(`Monitor cannot scope from ${scope.constructor.name} to ${context}`);
        }
        return new Monitor(childScope, this._directors);
    }
    isModule(context) {
        return (context.id !== undefined &&
            context.exports &&
            context.filename);
    }
    isClass(context) {
        return (typeof context === 'object' &&
            context.constructor &&
            context.constructor.name !== 'Object');
    }
    isMethod(context) {
        return (typeof context === 'function' &&
            this._scope instanceof Scope.ClassScope);
    }
    isFunction(context) {
        return (typeof context === 'function');
    }
}
exports.Monitor = Monitor;
