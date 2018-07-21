import { MonitorScope } from './monitor.scope';
import { FunctionScope } from './function.scope';
export interface IMethod {
    /** The function name */
    name: string;
    /** The containing class instance */
    container: any;
    /** The function handle */
    reference: Function;
}
/**
 * A method level scope
 */
export declare class MethodScope extends MonitorScope<IMethod> {
    /**
     * Creates a new method scope
     * @param container the containing class
     * @param reference the function handle
     */
    constructor(container: any, reference: Function);
    /**
     * Creates a new child function scope within a method
     * @param reference the function reference
     */
    function(reference: Function): FunctionScope;
}
