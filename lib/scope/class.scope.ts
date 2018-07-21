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
export class ClassScope extends MonitorScope<IClass> {

  /**
   * Creates a new class scope
   * @param instance the class instance
   */
  constructor(instance: any) {
    if (!instance || !instance.constructor) {
      throw new Error('ClassScope requires a valid class instance');
    }

    let name = instance.constructor.name;

    super(name, {
      name, instance
    });
  }

  /**
   * Creates a new child method scope
   * @param reference the method reference
   */
  method(reference: Function): MethodScope {
    return this.derive(new MethodScope(this.context.instance, reference));
  }
}
