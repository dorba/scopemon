import { MonitorScope } from './monitor.scope';
import { MethodScope } from './method.scope';
/**
 * A class level scope
 */
export declare class ClassScope extends MonitorScope {
    /**
     * Creates a new class scope
     * @param reference the class instance
     */
    constructor(reference: any);
    /**
     * Creates a new child method scope
     * @param reference the method reference
     */
    method(reference: Function): MethodScope;
}
