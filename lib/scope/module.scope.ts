import { MonitorScope } from './monitor.scope';
import { ClassScope } from './class.scope';
import { FunctionScope } from './function.scope';

/**
 * Represents a module scope context
 */
export interface IModule {

  /** The name of the module */
  name: string;

  /** The path of the module */
  path: string;
}

/**
 * A module level scope
 */
export class ModuleScope extends MonitorScope<IModule> {

  /**
   * Creates a new module scope
   * @param path the module path
   */
  constructor(path: string) {
    if (!path) {
      throw new Error('ModuleScope requires a path');
    }
    if (path[0] === '.') {
      throw new Error('ModuleScope requires absolute paths');
    }
    if (!path.toLowerCase().endsWith('.js')) {
      throw new Error('ModuleScope requires a fully qualified file path');
    }

    let name = path.split('/').pop();
    name = name.substr(0, name.length - 3);

    super(name, {
      name, path
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
