import { MonitorScope } from './monitor.scope';
import { ClassScope } from './class.scope';
import { FunctionScope } from './function.scope';
/**
 * Represents a module scope context
 */
export interface IModule {
    /** The name of the module */
    name: string;
    /** The path of the module */
    path: string;
}
/**
 * A module level scope
 */
export declare class ModuleScope extends MonitorScope<IModule> {
    /**
     * Creates a new module scope
     * @param path the module path
     */
    constructor(path: string);
    /**
     * Creates a new child class scope
     * @param instance the class instance
     */
    class(instance: any): ClassScope;
    /**
     * Creates a new child function scope with a module
     * @param reference the function handle
     */
    function(reference: Function): FunctionScope;
}
