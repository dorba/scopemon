declare type MonitorType = 'global' | 'module' | 'class' | 'method' | 'function';
/**
 * The execution scope of the monitor
 */
export declare class MonitorScope {
    private _name;
    private _type;
    private _reference;
    private _parent;
    private _root;
    private _path;
    /**
     * Creates a new scope
     * @param name the name of the scope
     * @param context optional context for the scope
     */
    constructor(name: string, context?: {
        type: MonitorType;
        reference: any;
    });
    /** Gets the scope type */
    readonly type: MonitorType;
    /** Gets a reference to the object associated with the scope */
    readonly reference: any;
    /** Gets the name of the scope */
    readonly name: string;
    /** Gets the parent scope */
    readonly parent: MonitorScope;
    /** Gets the root scope */
    readonly root: MonitorScope;
    /** Gets the full module path */
    readonly path: string;
    /**
     * Sets the parent of a scope to this scope
     * @param scope the child scope
     */
    derive<T extends MonitorScope>(scope: T): T;
}
export {};
