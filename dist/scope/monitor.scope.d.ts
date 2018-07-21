import { ModuleScope } from './module.scope';
/**
 * The execution scope of the monitor
 */
export declare class MonitorScope<T = any> {
    private _name;
    private _context;
    private _parent;
    private _root;
    /**
     * Creates a new scope
     * @param name the name of the scope
     * @param context optional context for the scope
     */
    constructor(name: string, context?: T);
    /** Gets the name of the scope */
    readonly name: string;
    /** Gets the scope context */
    readonly context: T;
    /** Gets the parent scope */
    readonly parent: MonitorScope<any>;
    /** Gets the root scope */
    readonly root: MonitorScope<any>;
    /**
     * Sets the parent of a scope to this scope
     * @param scope the child scope
     */
    derive<T extends MonitorScope>(scope: T): T;
    /**
     * Creates a new child module scope
     * @param path the module path
     */
    module(path: string): ModuleScope;
}
