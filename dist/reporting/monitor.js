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
    scopeTo(...contexts) {
        if (!contexts) {
            return this;
        }
        let previous;
        let current = this._scope;
        for (let ctx of contexts) {
            previous = current;
            current = null;
            if (this.isModule(ctx)) {
                current = previous.derive(new Scope.ModuleScope(ctx));
            }
            else if (this.isClass(ctx) && 'class' in previous) {
                current = previous.class(ctx);
            }
            else if (this.isMethod(ctx) && 'method' in previous) {
                current = previous.method(ctx);
            }
            else if (this.isFunction(ctx) && 'function' in previous) {
                current = previous.function(ctx);
            }
            if (!current) {
                throw new Error(`Monitor cannot scope from ${previous.constructor.name} to ${ctx}`);
            }
        }
        return new Monitor(current, this._directors);
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
