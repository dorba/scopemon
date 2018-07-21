import { MonitorScope } from './monitor.scope';
import { FunctionScope } from './function.scope';

export interface IMethod {
  /** The function name */
  name: string;

  /** The containing class instance */
  container: any

  /** The function handle */
  reference: Function
}

/**
 * A method level scope
 */
export class MethodScope extends MonitorScope<IMethod> {

  /**
   * Creates a new method scope
   * @param container the containing class
   * @param reference the function handle
   */
  constructor(container: any, reference: Function) {
    if (!container || !container.constructor) {
      throw new Error('MethodScope requires a valid class instance');
    }
    if (!reference || typeof reference !== 'function') {
      throw new Error('MethodScope requires a valid function reference');
    }

    let name = reference.name;

    super(name, {
      name, container, reference
    });
  }

  /**
   * Creates a new child function scope within a method
   * @param reference the function reference
   */
  function(reference: Function): FunctionScope {
    return this.derive(new FunctionScope(reference));
  }
}
