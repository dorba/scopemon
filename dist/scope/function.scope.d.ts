import { MonitorScope } from './monitor.scope';
/**
 * Represents a function scope context
 */
export interface IFunction {
    /** The function name */
    name: string;
    /** The function handle */
    reference: Function;
}
/**
 * A function level scope
 */
export declare class FunctionScope extends MonitorScope<IFunction> {
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
