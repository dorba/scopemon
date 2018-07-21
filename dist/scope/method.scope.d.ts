import { MonitorScope } from './monitor.scope';
import { FunctionScope } from './function.scope';
/**
 * A method level scope
 */
export declare class MethodScope extends MonitorScope {
    /**
     * Creates a new method scope
     * @param reference the function handle
     */
    constructor(reference: Function);
    /**
     * Creates a new child function scope within a method
     * @param reference the function reference
     */
    function(reference: Function): FunctionScope;
}
