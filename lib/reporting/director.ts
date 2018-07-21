import { MonitorScope } from '../scope';

/**
 * Represents the scope of a report
 */
export type Scope = Pick<MonitorScope, Exclude<keyof MonitorScope, 'derive'>>;

/**
 * Handles reception of monitor reports
 */
export abstract class Director<T=any> {

  constructor(public accept: string[]) {
  }

  abstract receive(topic: string, info: T, scope: Scope): void;
}
