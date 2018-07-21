import { MonitorScope } from './monitor.scope';

/**
 * Represents a function scope context
 */
export interface IFunction {

  /** The function name */
  name: string;

  /** The function handle */
  reference: Function
}

/**
 * A function level scope
 */
export class FunctionScope extends MonitorScope<IFunction> {

  /**
   * Creates a new function scope
   * @param reference the function handle
   */
  constructor(reference: Function) {
    if (!reference || typeof reference !== 'function') {
      throw new Error('FunctionScope requires a valid function reference');
    }

    let name = reference.name || 'anonymous';

    super(name, {
      name, reference
    });
  }

  /**
   * Creates a new child function scope within a function
   * @param reference the function reference
   */
  function(reference: Function): FunctionScope {
    return this.derive(new FunctionScope(reference));
  }
}
