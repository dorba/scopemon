import { ScopeContext } from './context';
/**
 * The execution scope of the monitor
 */
export declare class MonitorScope {
    private _name;
    private _context;
    private _parent;
    private _root;
    private _path;
    /**
     * Creates a new scope
     * @param name the name of the scope
     * @param context optional context for the scope
     */
    constructor(name: string, context?: ScopeContext);
    /** Gets the name of the scope */
    readonly name: string;
    /** Gets the scope context */
    readonly context: ScopeContext;
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
