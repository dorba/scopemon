import { MonitorScope } from './monitor.scope';
/**
 * A function level scope
 */
export declare class FunctionScope extends MonitorScope {
    /**
     * Creates a new function scope
     * @param reference the function handle
     */
    constructor(reference: Function);
    /**
     * Creates a new child function scope within a function
     * @param reference the function reference
     */
    function(reference: Function): FunctionScope;
}
