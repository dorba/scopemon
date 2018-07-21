import * as path from 'path';
import { MonitorScope } from './monitor.scope';
import { ClassScope } from './class.scope';
import { FunctionScope } from './function.scope';

/**
 * A module level scope
 */
export class ModuleScope extends MonitorScope {

  /**
   * Creates a new module scope
   * @param reference the node module instance
   */
  constructor(reference: NodeModule) {
    if (!reference) {
      throw new Error('ModuleScope requires a module');
    }

    let name = path.basename(reference.filename);
    name = name.substr(0, name.length - 3);

    super(name, {
      type: 'module',
      reference
    });
  }

  /**
   * Creates a new child class scope
   * @param instance the class instance
   */
  class(instance: any): ClassScope {
    return this.derive(new ClassScope(instance));
  }

  /**
   * Creates a new child function scope with a module
   * @param reference the function handle
   */
  function(reference: Function): FunctionScope {
    return this.derive(new FunctionScope(reference));
  }
}
