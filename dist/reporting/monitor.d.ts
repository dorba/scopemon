import * as Scope from '../scope';
import { Director } from './director';
declare type AnyScope = Scope.MonitorScope | Scope.ModuleScope | Scope.ClassScope | Scope.MethodScope | Scope.FunctionScope;
/**
 * A monitor which may report on events within a scope
 */
export declare class Monitor {
    private _scope;
    private _directors;
    /**
     * Creates a new monitor
     * @param from the scope to use, or a name for the root monitor
     * @param directors an array of directors to receive reports
     */
    constructor(from: string | AnyScope, directors: Director[]);
    /**
     * Reports new information
     * @param topic the topic to report on
     * @param info information about the topic
     */
    report(topic: string, info?: any): void;
    /**
     * Creates a new monitor within the specified scope
     * @param context the context to scope to
     */
    scopeTo(...contexts: any[]): Monitor;
    private isModule;
    private isClass;
    private isMethod;
    private isFunction;
}
export {};
