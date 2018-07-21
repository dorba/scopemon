/// <reference types="node" />
import { MonitorScope } from './monitor.scope';
import { ClassScope } from './class.scope';
import { FunctionScope } from './function.scope';
/**
 * A module level scope
 */
export declare class ModuleScope extends MonitorScope {
    /**
     * Creates a new module scope
     * @param reference the node module instance
     */
    constructor(reference: NodeModule);
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
