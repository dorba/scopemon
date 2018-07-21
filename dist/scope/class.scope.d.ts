import { MonitorScope } from './monitor.scope';
import { MethodScope } from './method.scope';
/**
 * Represents a class scope context
 */
export interface IClass {
    /** The class name */
    name: string;
    /** The class instance */
    instance: any;
}
/**
 * A class level scope
 */
export declare class ClassScope extends MonitorScope<IClass> {
    /**
     * Creates a new class scope
     * @param instance the class instance
     */
    constructor(instance: any);
    /**
     * Creates a new child method scope
     * @param reference the method reference
     */
    method(reference: Function): MethodScope;
}
