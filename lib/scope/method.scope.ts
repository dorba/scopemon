import { MonitorScope } from './monitor.scope';
import { FunctionScope } from './function.scope';

/**
 * A method level scope
 */
export class MethodScope extends MonitorScope {

  /**
   * Creates a new method scope
   * @param reference the function handle
   */
  constructor(reference: Function) {
    if (!reference || typeof reference !== 'function') {
      throw new Error('MethodScope requires a valid function reference');
    }

    let name = reference.name;

    super(name, {
      type: 'method',
      reference
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
