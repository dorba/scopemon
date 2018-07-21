import { MonitorScope } from '../scope';
/**
 * Represents the scope of a report
 */
export declare type Scope = Pick<MonitorScope, Exclude<keyof MonitorScope, 'derive'>>;
/**
 * Handles reception of monitor reports
 */
export declare abstract class Director<T = any> {
    accept: string[];
    constructor(accept: string[]);
    abstract receive(topic: string, info: T, scope: Scope): void;
}
