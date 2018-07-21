import { MonitorScope } from './monitor.scope';
import { MethodScope } from './method.scope';

/**
 * A class level scope
 */
export class ClassScope extends MonitorScope {

  /**
   * Creates a new class scope
   * @param reference the class instance
   */
  constructor(reference: any) {
    if (!reference || !reference.constructor) {
      throw new Error('ClassScope requires a valid class instance');
    }

    let name = reference.constructor.name;

    super(name, {
      type: 'class',
      reference
    });
  }

  /**
   * Creates a new child method scope
   * @param reference the method reference
   */
  method(reference: Function): MethodScope {
    return this.derive(new MethodScope(reference));
  }
}
