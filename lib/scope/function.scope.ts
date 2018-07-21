import { MonitorScope } from './monitor.scope';

/**
 * A function level scope
 */
export class FunctionScope extends MonitorScope {

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
      type: 'function',
      reference
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
